import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { useEffect, useRef } from "react";

const features = [
  {
    icon: "🌐",
    title: "Build Your Digital Presence",
    description:
      "In today's world, your website is your storefront. We help businesses build a strong, modern digital presence that communicates clearly, looks beautiful, and works seamlessly on all devices.",
  },
  {
    icon: "🛠",
    title: "Upgrade What You Already Have",
    description:
      "You started with Wix, Webflow, an AI builder? We specialize in taking existing projects and turning them into polished, high-performing websites without breaking the bank.",
  },
  {
    icon: "🤖",
    title: "Smarter Tools, Smarter Business",
    description:
      "Our team stays ahead of the curve with emerging AI technologies. We'll help you identify ways to automate tasks, streamline operations, and bring AI-enhanced solutions into your business in practical, effective ways.",
  },
];

const WhyChooseUs = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.playbackRate = 0.7; // Slow down to 70% of normal speed
    }
  }, []);

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
    <div className="section-wrapper bg-black/50">
      <section id="why-choose-us" className="section">
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
              className="text-3xl md:text-4xl font-bold text-white/95 mb-6"
            >
              Why Choose Us
            </motion.h2>
            <motion.p
              variants={itemVariants}
              className="text-xl text-white/75 max-w-3xl mx-auto"
            >
              There are plenty of tools to get you started. We can help you
              finish it.
            </motion.p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center max-w-7xl mx-auto">
            {/* Left side - Feature cards */}
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate={inView ? "visible" : "hidden"}
              className="space-y-6"
            >
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20 hover:bg-white/15 transition-all duration-300 shadow-lg hover:shadow-xl group"
                >
                  <div className="flex items-start space-x-4">
                    <div className="text-3xl group-hover:scale-110 transition-transform duration-300 flex-shrink-0">
                      {feature.icon}
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-semibold text-white/95 mb-3">
                        {feature.title}
                      </h3>
                      <p className="text-white/75 leading-relaxed">
                        {feature.description}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>

            {/* Right side - Video */}
            <motion.div
              variants={itemVariants}
              initial="hidden"
              animate={inView ? "visible" : "hidden"}
              className="relative"
            >
              <div className="backdrop-blur-md rounded-2xl p-4">
                <div
                  className="relative overflow-hidden rounded-xl"
                  style={{ maxHeight: "500px" }}
                >
                  <video
                    ref={videoRef}
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="w-full h-full object-cover grayscale"
                    style={{
                      objectPosition: "center 60%", // Adjust this to show bottom right area
                    }}
                  >
                    <source
                      src="/src/assets/video/fire-laptop.mp4"
                      type="video/mp4"
                    />
                    Your browser does not support the video tag.
                  </video>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default WhyChooseUs;
