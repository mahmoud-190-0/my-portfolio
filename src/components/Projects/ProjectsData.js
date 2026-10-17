import movieAppImage from "../../assets/images/movieAppImage.png";
import coffeeShopImage from "../../assets/images/coffeeShopImage.png";
import pharmacyImage from "../../assets/images/pharmacyImage.png";
import ecommerceImage from "../../assets/images/ecommerceImage.png";

export const PROJECTS = [
  {
    id: "movie-app",
    title: "Movie App",
    category: "Front-End Development",
    categoryKey: "frontend",
    description:
      "A responsive movie browsing application with a clean interface and seamless user experience.",
    technologies: [
      "React.js",
      "JavaScript (ES6+)",
      "CSS3",
      "Responsive Design",
    ],
    image: movieAppImage,
    imageAlt: "Movie App project screenshot",
    liveUrl: "https://movie-app-flax-delta-58.vercel.app/",
    githubUrl: ".",
  },
  {
    id: "coffee-shop",
    title: "Coffee Shop",
    category: "Front-End Development",
    categoryKey: "frontend",
    description:
      "A modern coffee shop website designed to showcase products and deliver a responsive browsing experience.",
    technologies: [
      "React.js",
      "JavaScript (ES6+)",
      "CSS3",
      "Responsive Design",
    ],
    image: coffeeShopImage,
    imageAlt: "Coffee Shop project screenshot",
    liveUrl: "https://coffee-shop-mu-pearl.vercel.app",
    githubUrl: "https://github.com/mahmoud-190-0/Coffee-Shop.git",
  },
  {
    id: "pharmacy",
    title: "Pharmacy",
    category: "Front-End Development",
    categoryKey: "frontend",
    description:
      "A responsive pharmacy interface for browsing products through a clear and intuitive layout.",
    technologies: [
      "React.js",
      "JavaScript (ES6+)",
      "CSS3",
      "Responsive Design",
    ],
    image: pharmacyImage,
    imageAlt: "Pharmacy project screenshot",
    liveUrl: "https://pharmacy-dusky-iota.vercel.app",
    githubUrl: "https://github.com/mahmoud-190-0/Pharmacy-front-end.git",
  },
  {
    id: "ecommerce",
    title: "Full-Stack E-Commerce",
    category: "Full-Stack Development",
    categoryKey: "fullstack",
    description:
      "A full-stack e-commerce application integrating a React frontend with a Node.js and Express API and MongoDB database.",
    technologies: ["MongoDB", "Express.js", "React.js", "Node.js"],
    image: ecommerceImage,
    imageAlt: "Full-Stack E-Commerce project placeholder",
    liveUrl: null,
    githubUrl: "https://github.com/mahmoud-190-0/E-Shop.git",
  },
];
