import { ShoppingBag, Zap, Heart, Star } from 'lucide-react';

const categories = [
  {
    id: 1,
    name: 'Electronics',
    icon: Zap,
    color: 'from-blue-400 to-cyan-400',
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&h=500&fit=crop',
  },
  {
    id: 2,
    name: 'Fashion',
    icon: ShoppingBag,
    color: 'from-purple-400 to-pink-400',
    image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500&h=500&fit=crop',
  },
  {
    id: 3,
    name: 'Lifestyle',
    icon: Heart,
    color: 'from-rose-400 to-orange-400',
    image: 'https://images.unsplash.com/photo-1556228578-8c89e6adf883?w=500&h=500&fit=crop',
  },
  {
    id: 4,
    name: 'Premium',
    icon: Star,
    color: 'from-amber-400 to-yellow-400',
    image: 'https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=500&h=500&fit=crop',
  },
];

export default function FeaturedCategories() {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
            Shop by Category
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Explore our diverse collection of premium products across multiple categories
          </p>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((category) => {
            const Icon = category.icon;
            return (
              <div
                key={category.id}
                className="group relative overflow-hidden rounded-2xl cursor-pointer h-80"
              >
                {/* Background Image */}
                <div className="absolute inset-0">
                  <img
                    src={category.image}
                    alt={category.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-black/40 group-hover:bg-black/50 transition-colors duration-300"></div>
                </div>

                {/* Content */}
                <div className="relative z-10 h-full flex flex-col items-center justify-center text-center p-6">
                  <div className={`mb-4 p-4 rounded-2xl bg-gradient-to-br ${category.color} bg-opacity-20 backdrop-blur-sm border border-white/20`}>
                    <Icon size={32} className="text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-2">
                    {category.name}
                  </h3>
                  <p className="text-white/80 text-sm mb-4">
                    Explore {category.name.toLowerCase()}
                  </p>
                  <button className="px-6 py-2 rounded-lg bg-white/20 text-white font-medium hover:bg-white/30 transition-colors border border-white/30 backdrop-blur-sm">
                    Browse
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
