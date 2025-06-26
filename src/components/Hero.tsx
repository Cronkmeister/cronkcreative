const Hero = () => {
  return (
    <div
      className="section-wrapper relative overflow-hidden"
      style={{ minHeight: "100vh" }}
    >
      <section
        className="section relative z-10 flex items-center justify-start min-h-screen"
        style={{ minHeight: "100vh" }}
      >
        <div className="w-full flex justify-start items-center pl-8 md:pl-16 lg:pl-24">
          <div className="w-full max-w-4xl p-16 rounded-3xl border-white/10 bg-white/5 backdrop-blur-sm shadow-sm text-left space-y-8">
            <h1 className="text-white/95 font-bold tracking-tight">
              Build Your Digital Presence
            </h1>
            <p className="max-w-2xl text-white/75">
              We help businesses and entrepreneurs build stunning websites and
              powerful web applications that drive growth and success.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <a
                href="#contact"
                className="inline-flex items-center justify-center px-8 py-4 rounded-full text-sm font-medium text-white bg-white/10 hover:bg-white/20 backdrop-blur-sm transition-all duration-200 border border-white/20"
              >
                Start Your Project
              </a>
              <a
                href="#portfolio"
                className="inline-flex items-center justify-center px-8 py-4 rounded-full text-sm font-medium text-white/90 hover:text-white hover:bg-white/20  transition-all duration-200 border border-white/20"
              >
                View Our Work
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Hero;
