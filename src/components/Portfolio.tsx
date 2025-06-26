import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { useState } from "react";
// import projects from "../data/projects.ts";
import tality from "../assets/images/tality.png";
import pomodoro from "../assets/images/pomodoro.png";
import iconic from "../assets/images/iconic.png";
import nasa from "../assets/images/nasa-project.png";
import designStudio from "../assets/images/161Design.png";
import journal_screenshot from "../assets/images/screenshot-journal.png";
import higherLower from "../assets/images/higher-lower.png";

const projects = [
  {
    title: "Tality",
    category: "Web Development",
    description:
      "Website redesign and modernisation for a cold plunge and sauna company. Design done in figma. Site built on Wix",
    image: tality,
    tech: ["Figma", "Wix", "Velo"],
    website: "https://www.talityspa.com/",
  },
  {
    title: "161 Design Studio",
    category: "Web Development",
    description:
      "Fixed styling issues, responsive screen sizes and custom fonts. Introduced analytics and optimized for SEO",
    image: designStudio,
    tech: ["Wordpress", "Divi", "Figma"],
    website: "https://161designstudio.com/",
  },
  {
    title: "Pomodoro App",
    category: "App Development",
    description:
      "Creating a functional pomodoro web app with settings for changing time and design. Figma files courtesy of FrontEndMentor.io",
    image: pomodoro,
    tech: ["Nextjs", "Tailwind", "Vercel"],
    website: "https://jcpomodoro.netlify.app/",
  },
  {
    title: "Iconic Concierge",
    category: "Web Development",
    description:
      "Work for a Gentlemen's Magazine. Upgraded the styling to clients requests to more meet modern website standards",
    image: iconic,
    tech: ["Wordpress", "WPBakery", "Figma"],
    website: "https://www.iconic-concierge.com/",
  },
  {
    title: "NASA Project",
    category: "Full Stack Development",
    description:
      "Using the NASA and SpaceX APIs to schedule future rocket launches as well, see upcoming launches and past missions.",
    image: nasa,
    tech: ["Node", "Express", "MongoDB"],
    website: "https://nasa-project.up.railway.app/",
  },
  {
    title: "Journal",
    category: "Portfolio",
    description:
      "An app to showcase my film photographs in a well designed gallery. View the them in different, appealing ways. See the locations the photos were taken and add information alongside them.",
    image: journal_screenshot,
    tech: ["React", "MySQL", "SASS"],
    website: "https://journal-jc.netlify.app/",
  },

  {
    title: "Higher or Lower",
    category: "Game Development",
    description:
      "Replicating the classic card game: 'Higher or Lower.' See how many in a row you can get!",
    image: higherLower,
    tech: ["Javascript", "HTML", "SASS"],
    website: "https://higher-lower-jc.netlify.app/",
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
      className="group relative bg-white/10 backdrop-blur-md rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow border border-white/20 flex flex-col"
    >
      <div className="h-48 overflow-hidden">
        <img
          src={project.image}
          alt={project.title}
          className="w-full h-full object-cover transform group-hover:scale-105 transition-all duration-300 grayscale group-hover:grayscale-0"
        />
      </div>

      <div className="p-6 flex-grow flex flex-col">
        <h3 className="text-xl font-semibold mb-2 text-white/95">
          {project.title}
        </h3>
        <p className="text-white/75 mb-4 flex-grow">{project.description}</p>

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
          href={project.website}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center text-fuchsia-400 hover:text-fuchsia-300"
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
  const [showAll, setShowAll] = useState(false);
  const projectsToShow = showAll ? projects : projects.slice(0, 6);

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
            {projectsToShow.map((project, index) => (
              <ProjectCard
                key={project.title}
                project={project}
                index={index}
              />
            ))}
          </div>

          {projects.length > 6 && (
            <div className="mt-12 text-center">
              <button
                onClick={() => setShowAll(!showAll)}
                className="px-8 py-3 rounded-full text-sm font-medium text-white bg-white/10 hover:bg-white/20 backdrop-blur-sm transition-all duration-200 border border-white/20"
              >
                {showAll ? "Show Less" : "View More"}
              </button>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default Portfolio;
