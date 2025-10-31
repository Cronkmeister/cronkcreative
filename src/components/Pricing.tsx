import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

const plans = [
  {
    name: "MONTHLY",
    price: "150",
    period: "/mo",
    description: "",
    features: [
      { text: "Design & Development", included: true },
      { text: "5 Pages", included: true },
      { text: "On-Page SEO", included: true },
      { text: "Unlimited Edits", included: true },
      { text: "Analytics", included: true },
      { text: "Hosting Included", included: true },
      { text: "24/7 Support", included: true },
    ],
    addons: [
      { text: "Free Redesign Every 3 Years", price: "$25/mo" },
      { text: "Blog", price: "$25/mo" },
    ],
    cta: "GET STARTED",
    popular: true,
    highlight: true,
  },
  {
    name: "ONE-TIME",
    price: "2449",
    period: "",
    description: "",
    features: [
      { text: "Design & Development", included: true },
      { text: "5 Pages", included: true },
      { text: "Analytics", included: true },
      { text: "24/7 Support", included: false },
    ],
    addons: [
      { text: "Hosting", price: "$25/mo" },
      { text: "Unlimited Edits", price: "$25/mo" },
      { text: "Additional Pages After 5", price: "$100/each" },
      { text: "Blog", price: "$250" },
    ],
    cta: "GET STARTED",
    popular: false,
    highlight: false,
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
            className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto"
          >
            {plans.map((plan, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className={`relative bg-white/10 backdrop-blur-md rounded-2xl shadow-lg overflow-hidden border ${
                  plan.highlight
                    ? "border-fuchsia-400/50 ring-2 ring-fuchsia-400/30"
                    : "border-white/20"
                }`}
              >
                <div className="p-8 flex flex-col h-full">
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-6">
                      <h3 className="text-3xl font-bold text-white/95">
                        {plan.name}
                      </h3>
                      <div className="text-right">
                        <div className="text-4xl font-bold text-white/95">
                          ${plan.price}
                          {plan.period}
                        </div>
                      </div>
                    </div>

                    <ul className="space-y-3">
                      {plan.features.map((feature, featureIndex) => (
                        <li key={featureIndex} className="flex items-start">
                          {feature.included ? (
                            <svg
                              className="h-6 w-6 text-fuchsia-400 flex-shrink-0"
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
                          ) : (
                            <svg
                              className="h-6 w-6 text-white/30 flex-shrink-0"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636"
                              />
                            </svg>
                          )}
                          <span className="ml-3 text-white/90">
                            {feature.text}
                          </span>
                        </li>
                      ))}
                    </ul>

                    {plan.addons && plan.addons.length > 0 && (
                      <ul className="mt-6 space-y-2 pt-6 border-t border-white/20">
                        {plan.addons.map((addon, addonIndex) => (
                          <li
                            key={addonIndex}
                            className="flex items-start text-white/90"
                          >
                            <span className="font-semibold mr-2 text-fuchsia-400">
                              + {addon.price}
                            </span>
                            <span>{addon.text}</span>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>

                  <div className="mt-8">
                    <a
                      href="#contact"
                      className="block w-full px-6 py-3 text-center text-base font-semibold rounded-full text-white bg-white/10 hover:bg-white/20 backdrop-blur-sm transition-all duration-200 border border-white/20"
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
