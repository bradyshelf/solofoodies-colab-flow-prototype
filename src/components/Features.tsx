
import { Palette, Code, Smartphone, Zap, Shield, Globe } from 'lucide-react';

const Features = () => {
  const features = [
    {
      icon: Palette,
      title: "Beautiful Design",
      description: "Stunning visuals that captivate and engage your audience with modern aesthetics."
    },
    {
      icon: Code,
      title: "Clean Code",
      description: "Well-structured, maintainable code that follows industry best practices."
    },
    {
      icon: Smartphone,
      title: "Responsive",
      description: "Perfect experience across all devices, from mobile to desktop."
    },
    {
      icon: Zap,
      title: "Fast Performance",
      description: "Optimized for speed with lightning-fast loading times."
    },
    {
      icon: Shield,
      title: "Secure",
      description: "Built with security in mind, protecting your data and users."
    },
    {
      icon: Globe,
      title: "Global Reach",
      description: "Accessible worldwide with internationalization support."
    }
  ];

  return (
    <section id="about" className="py-20 bg-white">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="bg-gradient-to-r from-gray-900 to-blue-800 bg-clip-text text-transparent">
              Why Choose Us
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            We combine creativity with technical expertise to deliver exceptional digital experiences
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={feature.title}
              className="group p-8 rounded-2xl bg-gradient-to-br from-white to-gray-50 border border-gray-100 hover:border-blue-200 hover:shadow-xl transform hover:-translate-y-2 transition-all duration-300"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <feature.icon className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">{feature.title}</h3>
              <p className="text-gray-600 leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
