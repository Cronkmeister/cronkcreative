import tality from "../assets/images/tality.png";
import designStudio from "../assets/images/161Design.png";
import pomodoro from "../assets/images/pomodoro.png";
import iconic from "../assets/images/iconic.png";
import nasa from "../assets/images/nasa-project.png";
import pong from "../assets/images/pong.png";
import journal_screenshot from "../assets/images/screenshot-journal.png";
import higherLower from "../assets/images/higher-lower.png";

const projects = [
  {
    image: tality,
    title: "Tality",
    description:
      "Website redesign and modernisation for a cold plunge and sauna company. Design done in figma. Site built on Wix",
    tech: ["Figma", "Wix", "Velo"],
    website: "https://www.talityspa.com/",
    private: true,
  },
  {
    image: designStudio,
    title: "161 Design Studio",
    description:
      "Fixed styling issues, responsive screen sizes and custom fonts. Introduced analytics and optimized for SEO",
    tech: ["Wordpress", "Divi", "Figma"],
    website: "https://161designstudio.com/",
    private: true,
  },
  {
    image: pomodoro,
    title: "Pomodoro App",
    description:
      "Creating a functional pomodoro web app with settings for changing time and design. Figma files courtesy of FrontEndMentor.io",
    tech: ["Nextjs", "Tailwind", "Vercel"],
    website: "https://jcpomodoro.netlify.app/",
    private: false,
  },
  {
    image: iconic,
    title: "Iconic Concierge",
    description:
      "Work for a Gentlemen's Magazine. Upgraded the styling to clients requests to more meet modern website standards",
    tech: ["Wordpress", "WPBakery", "Figma"],
    website: "https://www.iconic-concierge.com/",
    private: true,
  },
  {
    image: nasa,
    title: "NASA Project",
    description:
      "Using the NASA and SpaceX APIs to schedule future rocket launches as well, see upcoming launches and past missions.",
    tech: ["Node", "Express", "MongoDB"],
    website: "https://nasa-project.up.railway.app/",
    private: false,
  },
  {
    image: pong,
    title: "Pong",
    description:
      "Replicating the classic game of pong. Using websockets to make it multi-player.",
    tech: ["Javascript", "Socket.io", "Docker"],
    website: "https://multi-player-pong.up.railway.app/",
    private: false,
  },
  {
    image: journal_screenshot,
    title: "Journal",
    description:
      "An app to showcase my film photographs in a well designed gallery. View the them in different, appealing ways. See the locations the photos were taken and add information alongside them.",
    tech: ["React", "MySQL", "SASS"],
    website: "https://journal-jc.netlify.app/",
    private: false,
  },
  // {
  //   image: dad_jokes,
  //   title: "Dad Joke Generator",
  //   description:
  //     "Playing around with the OpenAI api. Enter a topic and let the generator tell you a jokes. Nevermind the Turing Test, this is the true test for AI",
  //   tech: ["Next.js", "OpenAI api", "CSS"],
  //   website: "https://joke-generator-three.vercel.app/",
  //   private: false,
  // },
  // {
  //   image: brainflix,
  //   title: "Brainflix",
  //   description: "A webpage to simulate a video streaming platform",
  //   tech: ["React", "JSON", "Express"],
  //   website: "https://brainflix-jc.netlify.app/",
  //   private: true,
  // },
  {
    image: higherLower,
    title: "Higher or Lower",
    description:
      "Replicating the classic card game: 'Higher or Lower.' See how many in a row you can get!",
    tech: ["Javascript", "HTML", "SASS"],
    website: "https://higher-lower-jc.netlify.app/",
    private: false,
  },
];

export default projects;
