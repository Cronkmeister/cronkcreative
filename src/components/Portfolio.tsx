import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

const projects = [
  {
    title: "E-commerce Platform",
    category: "Web Development",
    description:
      "Modern wellness brand site with booking integration and member portal",
    image: "https://placehold.co/600x400/2563eb/ffffff?text=Wellness+Brand",
    tech: ["React", "Node.js", "Stripe", "MongoDB"],
    link: "#",
  },
  {
    title: "E-commerce Platform",
    description:
      "Custom e-commerce solution with inventory management and analytics",
    image: "https://placehold.co/600x400/7c3aed/ffffff?text=E-commerce",
    tech: ["Next.js", "Shopify", "PostgreSQL", "Redis"],
    link: "#",
  },
  {
    title: "Restaurant Ordering System",
    description:
      "Online ordering platform with real-time updates and delivery tracking",
    image: "https://placehold.co/600x400/059669/ffffff?text=Restaurant",
    tech: ["Vue.js", "Firebase", "Google Maps API", "WebSocket"],
    link: "#",
  },
  {
    title: "SaaS Dashboard",
    description:
      "Analytics dashboard with real-time data visualization and reporting",
    image: "https://placehold.co/600x400/dc2626/ffffff?text=SaaS+Dashboard",
    tech: ["React", "D3.js", "GraphQL", "AWS"],
    link: "#",
  },
  {
    title: "Educational Platform",
    description:
      "Learning management system with video courses and progress tracking",
    image: "https://placehold.co/600x400/ea580c/ffffff?text=Education",
    tech: ["Next.js", "Prisma", "PostgreSQL", "AWS S3"],
    link: "#",
  },
  {
    title: "Real Estate Portal",
    description:
      "Property listing platform with advanced search and virtual tours",
    image: "https://placehold.co/600x400/0891b2/ffffff?text=Real+Estate",
    tech: ["React", "Node.js", "MongoDB", "Three.js"],
    link: "#",
  },
];

const ProjectCard = ({
  project,
  index,
}: {
  project: (typeof projects)[0];
  index: number;
}) => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="group relative bg-white/10 backdrop-blur-md rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow border border-white/20"
    >
      <div className="aspect-w-16 aspect-h-9 overflow-hidden">
        <img
          src={project.image}
          alt={project.title}
          className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-300"
        />
      </div>

      <div className="p-6">
        <h3 className="text-xl font-semibold mb-2 text-white/95">
          {project.title}
        </h3>
        <p className="text-white/75 mb-4">{project.description}</p>

        <div className="flex flex-wrap gap-2 mb-4">
          {project.tech.map((tech) => (
            <span
              key={tech}
              className="px-3 py-1 bg-white/20 text-white/90 rounded-full text-sm border border-white/20"
            >
              {tech}
            </span>
          ))}
        </div>

        <a
          href={project.link}
          className="inline-flex items-center text-sky-400 hover:text-sky-300"
        >
          View Project
          <svg
            className="w-5 h-5 ml-2 transform group-hover:translate-x-1 transition-transform"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
        </a>
      </div>
    </motion.div>
  );
};

const Portfolio = () => {
  return (
    <div className="section-wrapper bg-transparent">
      <section id="portfolio" className="section">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-display font-bold mb-4 text-white/95">
              Past Projects
            </h2>
            <p className="text-white/75 max-w-2xl mx-auto">
              Explore our recent work and see how we've helped businesses
              transform their digital presence
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project, index) => (
              <ProjectCard
                key={project.title}
                project={project}
                index={index}
              />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Portfolio;
