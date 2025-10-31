const services = [
  {
    title: "Design",
    description:
      "Beautiful, responsive websites with intuitive user interfaces that engage your audience and reflect your brand identity.",
    icon: (
      <svg
        className="w-5 h-5"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01"
        />
      </svg>
    ),
  },
  {
    title: "Development",
    description:
      "Custom web applications and e-commerce solutions built with modern technologies and best practices.",
    icon: (
      <svg
        className="w-5 h-5"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"
        />
      </svg>
    ),
  },
  {
    title: "SEO Optimization",
    description:
      "Strategic optimization to improve your online visibility, drive organic traffic, and grow your digital presence.",
    icon: (
      <svg
        className="w-5 h-5"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
        />
      </svg>
    ),
  },
];

const Services = () => {
  return (
    <div className="section-wrapper bg-transparent">
      <section id="services" className="section">
        <div className="container">
          <div>
            <div>
              <div className="text-center mb-24">
                <h2 className="text-white/95 font-bold tracking-tight mb-6">
                  Our Services
                </h2>
                <p className="text-white/75 max-w-2xl mx-auto">
                  We offer a comprehensive range of web design and development
                  services to help your business succeed online.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-12 max-w-6xl mx-auto">
                {services.map((service, index) => (
                  <div
                    key={index}
                    className="bg-white/10 backdrop-blur-md rounded-2xl p-8 text-center border border-white/20 hover:bg-white/15 transition-all duration-300 shadow-lg"
                  >
                    <div className="w-14 h-14 bg-white/20 rounded-full flex items-center justify-center text-white mb-6 mx-auto">
                      {service.icon}
                    </div>
                    <h3 className="text-white/95 font-semibold mb-4">
                      {service.title}
                    </h3>
                    <p className="text-white/75">{service.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Services;
