import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

const plans = [
  {
    name: "Starter",
    price: "250",
    description: "Perfect for small businesses and startups",
    features: [
      "Custom Website Design",
      "Mobile Responsive",
      "Contact Form",
      "Basic SEO Setup",
      "1 Month Free Support",
    ],
    cta: "Get Started",
    popular: false,
  },
  {
    name: "Professional",
    price: "800",
    description: "Ideal for growing businesses",
    features: [
      "Everything in Starter",
      "E-commerce",
      "Blog Setup",
      "Advanced SEO",
      "As many iterations a needed",
      "3 Months Free Support",
      "Analytics Integration",
    ],
    cta: "Get Started",
    popular: true,
  },
  {
    name: "Enterprise",
    price: "Custom",
    description: "For large businesses with complex needs",
    features: [
      "Everything in Professional",
      "Custom Web Application",
      "API Development",
      "Advanced Security",
      "Performance Optimization",
      "6 Months Free Support",
      "Priority Support",
      "Custom Integrations",
    ],
    cta: "Get Started",
    popular: false,
  },
];

const Pricing = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
      },
    },
  };

  return (
    <div className="section-wrapper bg-transparent">
      <section id="pricing" className="section">
        <div className="container">
          <motion.div
            ref={ref}
            variants={containerVariants}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            className="text-center mb-16"
          >
            <motion.h2
              variants={itemVariants}
              className="text-3xl sm:text-4xl font-bold text-white/95 mb-4"
            >
              Simple, Transparent Pricing
            </motion.h2>
            <motion.p
              variants={itemVariants}
              className="text-xl text-white/75 max-w-3xl mx-auto"
            >
              Choose the perfect plan for your business needs. All plans include
              our core features and dedicated support.
            </motion.p>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {plans.map((plan, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className={`relative bg-white/10 backdrop-blur-md rounded-2xl shadow-lg overflow-hidden border border-white/20 ${
                  plan.popular ? "ring-2 ring-sky-500 transform scale-105" : ""
                }`}
              >
                {plan.popular && (
                  <div className="absolute top-0 right-0 bg-gradient-to-r from-sky-500 to-fuchsia-500 text-white px-4 py-1 text-sm font-semibold rounded-bl-lg">
                    Most Popular
                  </div>
                )}
                <div className="p-8 flex flex-col h-full">
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold text-white/95 mb-2">
                      {plan.name}
                    </h3>
                    <div className="mt-4 flex items-baseline text-white/95">
                      {plan.price === "Custom" ? (
                        <span className="text-4xl font-bold">Custom</span>
                      ) : (
                        <>
                          <span className="text-4xl font-bold">
                            ${plan.price}
                          </span>
                          <span className="ml-1 text-xl text-white/75">
                            /project
                          </span>
                        </>
                      )}
                    </div>
                    <p className="mt-4 text-white/75">{plan.description}</p>
                    <ul className="mt-8 space-y-4">
                      {plan.features.map((feature, featureIndex) => (
                        <li key={featureIndex} className="flex items-start">
                          <svg
                            className="h-6 w-6 text-sky-400 flex-shrink-0"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M5 13l4 4L19 7"
                            />
                          </svg>
                          <span className="ml-3 text-white/75">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="mt-8">
                    <a
                      href="#contact"
                      className={`block w-full px-6 py-3 text-center text-base font-medium rounded-lg ${
                        plan.popular
                          ? "bg-gradient-to-r from-sky-500 to-fuchsia-500 text-white hover:from-sky-600 hover:to-fuchsia-600"
                          : "bg-white/20 text-white/95 hover:bg-white/30 border border-white/20"
                      } transition-colors duration-200`}
                    >
                      {plan.cta}
                    </a>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>

          <motion.div variants={itemVariants} className="mt-16 text-center">
            <p className="text-white/75">
              Need a custom solution?{" "}
              <a
                href="#contact"
                className="text-sky-400 hover:text-sky-300 font-medium"
              >
                Contact us
              </a>{" "}
              for a personalized quote.
            </p>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Pricing;
