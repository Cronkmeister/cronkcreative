import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

// Placeholder blog posts - replace with real content
const blogPosts = [
  {
    title: "Top 5 Mistakes in DIY Websites",
    excerpt:
      "Learn about common pitfalls when building your own website and how to avoid them.",
    image: "https://placehold.co/600x400/2563eb/ffffff?text=DIY+Mistakes",
    date: "June 1, 2024",
    readTime: "5 min read",
    category: "Web Design",
    link: "#",
  },
  {
    title: "Why Your Website Speed Matters",
    excerpt:
      "Discover how website performance impacts your business and what you can do about it.",
    image: "https://placehold.co/600x400/7c3aed/ffffff?text=Speed+Matters",
    date: "May 25, 2024",
    readTime: "7 min read",
    category: "Performance",
    link: "#",
  },
  {
    title: "SEO Best Practices for 2024",
    excerpt:
      "Stay ahead of the curve with these essential SEO strategies for the modern web.",
    image: "https://placehold.co/600x400/059669/ffffff?text=SEO+2024",
    date: "May 18, 2024",
    readTime: "8 min read",
    category: "SEO",
    link: "#",
  },
];

const BlogCard = ({
  post,
  index,
}: {
  post: (typeof blogPosts)[0];
  index: number;
}) => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <motion.article
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="bg-white/10 backdrop-blur-md rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow border border-white/20"
    >
      <a href={post.link} className="block group">
        <div className="aspect-w-16 aspect-h-9 overflow-hidden">
          <img
            src={post.image}
            alt={post.title}
            className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-300"
          />
        </div>

        <div className="p-6">
          <div className="flex items-center gap-4 mb-3">
            <span className="px-3 py-1 bg-white/20 text-white/90 rounded-full text-sm border border-white/20">
              {post.category}
            </span>
            <span className="text-sm text-white/75">{post.readTime}</span>
          </div>

          <h3 className="text-xl font-semibold mb-2 text-white/95 group-hover:text-sky-400 transition-colors">
            {post.title}
          </h3>

          <p className="text-white/75 mb-4">{post.excerpt}</p>

          <div className="flex items-center justify-between">
            <time className="text-sm text-white/75">{post.date}</time>
            <span className="text-sky-400 group-hover:text-sky-300 group-hover:translate-x-1 transition-transform inline-flex items-center">
              Read More
              <svg
                className="w-5 h-5 ml-2"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </span>
          </div>
        </div>
      </a>
    </motion.article>
  );
};

const Blog = () => {
  return (
    <div className="section-wrapper bg-transparent">
      <section id="blog" className="section">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-display font-bold mb-4 text-white/95">
              Insights & Tips
            </h2>
            <p className="text-white/75 max-w-2xl mx-auto">
              Stay informed with our latest articles on web design, development,
              and digital strategy
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogPosts.map((post, index) => (
              <BlogCard key={post.title} post={post} index={index} />
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="text-center mt-12"
          >
            <a
              href="#"
              className="inline-flex items-center text-sky-400 hover:text-sky-300"
            >
              View All Articles
              <svg
                className="w-5 h-5 ml-2"
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
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Blog;
