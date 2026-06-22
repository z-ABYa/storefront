import { Link } from 'react-router-dom';

export default function CategoriesSection() {
  const categories = [
    {
      title: 'Beauty',
      slug: 'beauty',
      image: 'https://i.ibb.co/QFJ5BzN8/top-view-arrangement-with-beauty-bag-copy-space.jpg',
    },
    {
      title: 'Clothes',
      slug: 'clothes',
      image: 'https://i.ibb.co/0yZ25WGr/11662075.jpg',
    },
    {
      title: 'Pets',
      slug: 'pets',
      image: 'https://i.ibb.co/9H6k4fJQ/two-golden-retriever-puppies-wearing-scarves.jpg',
    },
  ];

  return (
    <section className="w-full bg-white py-10">
      {/* Section label */}
      <div className="flex items-center gap-2.5 px-6 sm:px-10 lg:px-16 mb-6">
        <span className="w-2 h-2 bg-black flex-none" />
        <span className="text-[11px] sm:text-xs font-mono uppercase tracking-[0.2em] text-black">
          Our Categories
        </span>
      </div>

      {/* Category rows */}
      <div>
        {categories.map((category, idx) => (
          <Link
            key={idx}
            to={`/collections/${category.slug}`}
            className="group relative flex items-center h-48 sm:h-56 lg:h-[220px] px-6 sm:px-10 lg:px-16 overflow-hidden border-b border-black/10 last:border-b-0 bg-white transition-colors duration-300 hover:bg-[#171717]"
          >
            {/* Image + title group, slides right on hover */}
            <div className="flex items-center h-full transition-transform duration-300 ease-out group-hover:translate-x-4 lg:group-hover:translate-x-6">
              {/* Image */}
              <div className="relative h-full w-28 sm:w-32 lg:w-36 flex-none">
                <img
                  src={category.image}
                  alt={category.title}
                  className="absolute bottom-0 left-0 h-[78%] w-auto object-contain"
                />
              </div>

              {/* Title */}
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-mono uppercase tracking-tight text-black transition-colors duration-300 group-hover:text-white">
                {category.title}
              </h2>
            </div>

            {/* Arrow, revealed on hover */}
            <span className="absolute right-8 sm:right-12 lg:right-16 text-white opacity-0 translate-x-10 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-0">
              <svg
                className="w-7 h-7"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3" />
              </svg>
            </span>
          </Link>
        ))}
      </div>
    </section>
  );
}