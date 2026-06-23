import { Truck, Lock, Award, Headphones } from 'lucide-react';

const features = [
  {
    icon: Award,
    title: 'PREMIUM QUALITY',
    description: 'CURATED FABRICS, FINISHED WITH INTENT',
  },
  {
    icon: Truck,
    title: 'SWIFT SHIPPING',
    description: 'PAN-INDIA DELIVERY, TRACKED END TO END',
  },
  {
    icon: Headphones,
    title: 'REAL SUPPORT',
    description: 'REACH US ANYTIME, WE ACTUALLY RESPOND',
  },
  {
    icon: Lock,
    title: 'SECURE CHECKOUT',
    description: 'ENCRYPTED PAYMENTS, ZERO STRESS',
  },
];

export default function WhyChooseUs() {
  return (
    <section className="bg-[#1c1c1c] text-white">
      <div className="grid grid-cols-1 md:grid-cols-4 max-w-none">

        {features.map((feature, index) => {
          const Icon = feature.icon;

          return (
            <div
              key={index}
              className={`
                flex flex-col items-center justify-center text-center
                py-20 px-6
                border-white/10
                ${index !== features.length - 1 ? 'md:border-r' : ''}
              `}
            >
              {/* Icon */}
              <Icon
                size={28}
                strokeWidth={1.5}
                className="mb-6 text-white"
              />

              {/* Title */}
              <h3
                className="
                  text-sm
                  font-semibold
                  tracking-widest
                  mb-5
                "
              >
                {feature.title}
              </h3>

              {/* Description */}
              <p
                className="
                  text-xs
                  tracking-wider
                  text-gray-400
                  uppercase
                  max-w-xs
                "
              >
                {feature.description}
              </p>

            </div>
          );
        })}

      </div>
    </section>
  );
}