import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addItem, createCart } from '../../store/cartSlice';
import { cartAPI, cartItemsAPI, productsAPI } from '../../services/api';
import { useState, useEffect, useRef } from 'react';


const TABS = [
  { key: 'best-sellers', label: 'Best Sellers' },
  { key: 'trending', label: 'Trending Now' },
];

export default function FeaturedCollectionGrid() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { id: cartId } = useSelector((state) => state.cart);
  const [activeTab, setActiveTab] = useState('best-sellers');
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [addingToCart, setAddingToCart] = useState({});
  const [scrollProgress, setScrollProgress] = useState({ ratio: 0, thumbRatio: 1 });
  const [transitionPhase, setTransitionPhase] = useState('in'); // 'in' | 'out'
  const scrollRef = useRef(null);
  const pendingTabRef = useRef(null);

  const handleTabClick = (tabKey) => {
    if (tabKey === activeTab || transitionPhase === 'out') return;
    pendingTabRef.current = tabKey;
    setTransitionPhase('out');
  };

  // Once the fade-out finishes, swap the active tab (which triggers the
  // fetch below) and reset scroll position for the incoming collection.
  useEffect(() => {
    if (transitionPhase !== 'out' || !pendingTabRef.current) return;
    const timer = setTimeout(() => {
      setActiveTab(pendingTabRef.current);
      pendingTabRef.current = null;
      if (scrollRef.current) scrollRef.current.scrollLeft = 0;
    }, 250);
    return () => clearTimeout(timer);
  }, [transitionPhase]);

  const scrollLeft = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: -400, behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: 400, behavior: 'smooth' });
    }
  };

  // Fetch products for whichever tab is active. The `ordering` values below
  // are placeholders — swap them for whatever query params your API actually
  // uses to distinguish "best sellers" from "trending" (e.g. a `tag`,
  // `collection`, or `sort` param).
  useEffect(() => {
    let cancelled = false;
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const params =
          activeTab === 'best-sellers'
            ? { page: 1, page_size: 8, ordering: '-sales_count' }
            : { page: 1, page_size: 8, ordering: '-trending_score' };
        const res = await productsAPI.getAll(params);
        const data = res.data.results || res.data;
        if (!cancelled) setProducts(data);
      } catch (err) {
        console.error('Failed to load products', err);
        if (!cancelled) setProducts([]);
      } finally {
        if (!cancelled) {
          setLoading(false);
          setTransitionPhase('in');
        }
      }
    };
    fetchProducts();
    return () => {
      cancelled = true;
    };
  }, [activeTab]);

  // Track horizontal scroll position to drive the segmented progress bar.
  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    const updateProgress = () => {
      const { scrollLeft: sl, scrollWidth, clientWidth } = el;
      const thumbRatio = scrollWidth > 0 ? Math.min(clientWidth / scrollWidth, 1) : 1;
      const maxScroll = scrollWidth - clientWidth;
      const ratio = maxScroll > 0 ? sl / maxScroll : 0;
      setScrollProgress({ ratio, thumbRatio });
    };

    updateProgress();
    el.addEventListener('scroll', updateProgress, { passive: true });
    window.addEventListener('resize', updateProgress);
    return () => {
      el.removeEventListener('scroll', updateProgress);
      window.removeEventListener('resize', updateProgress);
    };
  }, [products]);

  const handleAddToCart = async (e, product) => {
    e.stopPropagation();
    try {
      setAddingToCart((prev) => ({ ...prev, [product.id]: true }));
      let activeCartId = cartId;

      if (!activeCartId) {
        const cartResponse = await cartAPI.create();
        activeCartId = cartResponse.data.id;
        dispatch(createCart(activeCartId));
      }

      dispatch(addItem({
        product: {
          id: product.id,
          title: product.title,
          unit_price: product.unit_price,
        },
        quantity: 1,
      }));

      try {
        await cartItemsAPI.add(activeCartId, { product_id: product.id, quantity: 1 });
      } catch (err) {
        console.error('Failed to add item to server:', err);
      }

      setTimeout(() => {
        setAddingToCart((prev) => ({ ...prev, [product.id]: false }));
      }, 1200);
    } catch (err) {
      console.error('Failed to add to cart', err);
      setAddingToCart((prev) => ({ ...prev, [product.id]: false }));
    }
  };

  const getImageUrl = (product) => {
    if (product.images && product.images.length > 0) {
      return `http://localhost:8000${product.images[0].image}`;
    }
    const fallbacks = [
      'https://i.ibb.co/Kx45wSqg/acara-web-photos-1080-1350-0001s-0001-DSC06131.jpg',
      'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500&h=700&fit=crop',
      'https://images.unsplash.com/photo-1506629082632-4318b5e7c0fd?w=500&h=700&fit=crop',
      'https://i.ibb.co/B2bgFQrw/acara-web-photos-1080-1350-0001s-0002-DSC06129.jpg',
      'https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?w=500&h=700&fit=crop',
      'https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=500&h=700&fit=crop',
      'https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?w=500&h=700&fit=crop',
      'https://i.ibb.co/Cp83r0TZ/acara-web-photos-1080-1350-0001s-0003-DSC06128.jpg',
    ];
    return fallbacks[(product.id - 1) % fallbacks.length];
  };


  return (
    <section className="w-full h-screen flex flex-col justify-between pt-24 pb-8 bg-white">
      <style>{`
        .best-sellers-scroll {
          scrollbar-width: none;
        }
        .best-sellers-scroll::-webkit-scrollbar {
          display: none;
        }
        .product-card-atc {
          transform: translateY(100%);
          transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }
        .product-card-wrap:hover .product-card-atc {
          transform: translateY(0%);
        }
        .product-card-img {
          transition: transform 0.6s cubic-bezier(0.4, 0, 0.2, 1);
        }
        .product-card-wrap:hover .product-card-img {
          transform: scale(1.04);
        }
      `}</style>

      {/* Header / Tabs */}
      <div className="flex-none">
        <div className="flex items-baseline gap-7 px-4 sm:px-8 lg:px-12 mb-5">
          {TABS.map((tab) => {
            const isActive = activeTab === tab.key;
            return (
              <button
                key={tab.key}
                onClick={() => handleTabClick(tab.key)}
                className={`flex items-center gap-2.5 text-xl sm:text-2xl font-mono tracking-tight uppercase transition-colors duration-200 ${
                  isActive ? 'text-black' : 'text-black/25 hover:text-black/45'
                }`}
              >
                {isActive && <span className="w-2.5 h-2.5 square-full bg-black flex-none" />}
                {tab.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Horizontal Scroll Strip Container */}
      <div className="relative flex-1 min-h-0 w-full group">
        {/* Left navigation arrow */}
        <button
          onClick={scrollLeft}
          className="absolute left-6 top-[calc(50%-28px)] -translate-y-1/2 z-10 w-12 h-12 rounded-full bg-white/90 shadow-md border border-black/5 flex items-center justify-center transition-all duration-300 opacity-0 group-hover:opacity-100 hover:bg-white hover:scale-105 cursor-pointer"
          aria-label="Scroll left"
        >
          <svg className="w-6 h-6 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
          </svg>
        </button>

        {/* Right navigation arrow */}
        <button
          onClick={scrollRight}
          className="absolute right-6 top-[calc(50%-28px)] -translate-y-1/2 z-10 w-12 h-12 rounded-full bg-white/90 shadow-md border border-black/5 flex items-center justify-center transition-all duration-300 opacity-0 group-hover:opacity-100 hover:bg-white hover:scale-105 cursor-pointer"
          aria-label="Scroll right"
        >
          <svg className="w-6 h-6 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
          </svg>
        </button>

        <div
          className={`h-full transition-all duration-300 ease-out ${
            transitionPhase === 'out' ? 'opacity-0 translate-y-2' : 'opacity-100 translate-y-0'
          }`}
        >
          {loading ? (
            <div className="flex h-full items-stretch">
              {[...Array(4)].map((_, i) => (
                <div
                  key={i}
                  className={`flex-1 px-4 sm:px-8 lg:px-12 ${i !== 3 ? ' border-black/10' : ''}`}
                >
                  <div className="w-full h-full bg-black/5 animate-pulse" />
                </div>
              ))}
            </div>
          ) : (
            <div
              ref={scrollRef}
              className="best-sellers-scroll w-full h-full flex overflow-x-auto scroll-smooth items-stretch"
            >
              {products.map((product) => (
                <div
                  key={product.id}
                  className={`product-card-wrap flex-none cursor-pointer flex flex-col h-full px-4 sm:px-6 lg:px-8`}
                  style={{ width: 'clamp(220px, calc((100vh - 280px) * 3 / 4), 450px)' }}
                  onClick={() => navigate(`/products/${product.id}`)}
                >
                  {/* Image */}
                  <div className="relative overflow-hidden bg-black/5 flex-1 min-h-0">
                    <img
                      src={getImageUrl(product)}
                      alt={product.title}
                      className="product-card-img w-full h-full object-cover"
                    />


                    {/* Slide-up Add to Cart */}
                    <button
                      className="product-card-atc absolute bottom-0 left-0 right-0 py-3 bg-[#171717] text-white text-[10px] tracking-[0.25em] uppercase font-semibold z-10"
                      onClick={(e) => handleAddToCart(e, product)}
                      disabled={addingToCart[product.id]}
                    >
                      {addingToCart[product.id] ? '✓ Added' : 'Add to cart'}
                    </button>
                  </div>

                  {/* Info */}
                  <div className="pt-3 pb-2 flex-none">
                    <p className="text-[11px] tracking-[0.1em] uppercase font-mono text-black leading-tight line-clamp-1">
                      {product.title}
                    </p>
                    <p className="text-[11px] tracking-[0.05em] font-mono text-black/60 mt-1">
                      RS. {parseFloat(product.unit_price).toFixed(2)}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Scroll progress indicator */}
      <div className="flex-none flex justify-center pt-6">
        <div className="w-40 h-[3px] bg-black/10 rounded-full relative overflow-hidden">
          <div
            className="absolute top-0 left-0 h-full bg-[#171717] rounded-full"
            style={{
              width: `${scrollProgress.thumbRatio * 100}%`,
              transform: `translateX(${scrollProgress.ratio * (100 / scrollProgress.thumbRatio - 100)}%)`,
            }}
          />
        </div>
      </div>
    </section>
  );
}