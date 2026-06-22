export default function BrandStatement() {
  return (
    <section className="w-full py-24 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-3xl mx-auto">
        {/* Image */}
        <div className="mb-12 h-96 overflow-hidden">
          <img
            src="https://i.ibb.co/3ys72G1K/11662230.jpg"
            alt="Brand Statement"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Text */}
        <div className="text-center">
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black text-black mb-6 leading-tight tracking-wide">
            We didn't come to fit in.
          </h2>
          <p className="text-lg sm:text-xl text-gray-700 font-light leading-relaxed tracking-wide">
            Storefront was built to interrupt. Streetwear with a pulse, art you can wear, chaos with a clean cut.
          </p>
        </div>
      </div>
    </section>
  );
}
