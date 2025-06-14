import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

const testimonials = [
  {
    quote:
      "Working with Cronk Creative transformed our online presence. Their attention to detail and creative approach exceeded our expectations.",
    author: "Sarah Johnson",
    role: "Marketing Director",
    company: "TechStart Inc.",
    image: "https://placehold.co/100x100/2563eb/ffffff?text=SJ",
  },
  {
    quote:
      "The team delivered a website that perfectly captures our brand's essence while ensuring excellent performance and user experience.",
    author: "Michael Chen",
    role: "Founder",
    company: "GrowthLabs",
    image: "https://placehold.co/100x100/7c3aed/ffffff?text=MC",
  },
  {
    quote:
      "From concept to launch, the process was smooth and professional. Our new site has already increased our conversion rate by 40%.",
    author: "Emma Rodriguez",
    role: "CEO",
    company: "Innovate Solutions",
    image: "https://placehold.co/100x100/059669/ffffff?text=ER",
  },
];

const stats = [
  { label: "Projects Completed", value: "50+" },
  { label: "Happy Clients", value: "30+" },
  { label: "Years Experience", value: "5+" },
  { label: "Awards Won", value: "10+" },
];

const StatsAndTestimonials = () => {
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
      <section id="stats-testimonials" className="section">
        <div className="container">
          <motion.div
            ref={ref}
            variants={containerVariants}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            className="space-y-16"
          >
            {/* Stats Section */}
            <motion.div variants={itemVariants} className="text-center">
              <h2 className="text-3xl md:text-4xl font-display font-bold mb-12 text-white/95">
                Our Impact in Numbers
              </h2>
              <div className="grid grid-cols-2 gap-8 sm:grid-cols-4 max-w-4xl mx-auto">
                {stats.map((stat, index) => (
                  <div key={index} className="text-center">
                    <div className="text-3xl font-bold text-white/95 mb-2">
                      {stat.value}
                    </div>
                    <div className="text-sm text-white/75">{stat.label}</div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Testimonials Section */}
            <motion.div variants={itemVariants}>
              <h2 className="text-3xl md:text-4xl font-display font-bold text-center mb-12 text-white/95">
                What Our Clients Say
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {testimonials.map((testimonial, index) => (
                  <motion.div
                    key={index}
                    variants={itemVariants}
                    className="bg-white/10 backdrop-blur-md rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow border border-white/20"
                  >
                    <div className="flex items-center mb-4">
                      <img
                        src={testimonial.image}
                        alt={testimonial.author}
                        className="w-12 h-12 rounded-full mr-4"
                      />
                      <div>
                        <div className="font-semibold text-white/95">
                          {testimonial.author}
                        </div>
                        <div className="text-sm text-white/75">
                          {testimonial.role}, {testimonial.company}
                        </div>
                      </div>
                    </div>
                    <blockquote className="text-white/75 italic">
                      "{testimonial.quote}"
                    </blockquote>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default StatsAndTestimonials;
