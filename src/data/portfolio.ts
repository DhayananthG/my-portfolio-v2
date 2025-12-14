import { Code2, Database, Globe, Cpu, Share2, Zap, Layout, Shield, Server, Box, Brain, Cloud, Network, Github, Dribbble, Instagram } from 'lucide-react';

export const portfolioData = {
  personal: {
    name: "Dhayananth",
    title: "Full-Stack Developer",
    description: "Full-Stack Developer with expertise in MERN, Python-Django, and Deep Learning. Experienced in UI/UX, database management, and cloud computing. Passionate about scalable tech, automation, and innovation.",
    email: "dhayananthgs@gmail.com",
    github: "https://github.com/DhayananthG",
    linkedin: "https://www.linkedin.com/in/dhayananthgs",
  },
  socials: [
      { icon: Github, href: "https://github.com/DhayananthG", label: "GITHUB" },
      { icon: Code2, href: "#", label: "CODEPEN" },
      { icon: Dribbble, href: "#", label: "DRIBBBLE" },
      { icon: Instagram, href: "#", label: "INSTA" }
  ],
  skills: [
    { name: "MERN Stack", icon: Database, level: 90 },
    { name: "React & Tailwind", icon: Layout, level: 92 },
    { name: "Django & Python", icon: Server, level: 85 },
    { name: "Machine Learning", icon: Brain, level: 80 },
    { name: "Cloud Computing", icon: Cloud, level: 75 },
    { name: "Cybersecurity", icon: Shield, level: 70 },
  ],
  aboutFeatures: [
    {
        icon: Cpu,
        title: "System Architecture",
        desc: "Designing robust, scalable backends that can handle massive throughput with minimal latency."
    },
    {
        icon: Network,
        title: "Neural Networks",
        desc: "Integrating machine learning models directly into web applications for smarter interactions."
    },
    {
        icon: Code2,
        title: "Full-Stack Eng",
        desc: "End-to-end development using modern frameworks like Next.js, Django, and TensorFlow."
    },
    {
        icon: Zap,
        title: "Performance",
        desc: "Obsessive optimization for 60fps animations and sub-second load times."
    }
  ],
  projects: [
    {
      title: "Hate Speech Detection",
      description: "Detecting and classifying Homophobic and Transphobic Comments using ANN with five layers to enhance Social Media Safety.",
      tech: ["ANN", "Deep Learning", "Python"],
      image: "ai-safety",
      link: "#",
      github: "#"
    },
    {
      title: "E-Learning Platform",
      description: "Feature-rich Responsive platform utilizing MERN Stack with Course management for Students and Instructors.",
      tech: ["MERN Stack", "REST APIs", "React"],
      image: "elearning",
      link: "#",
      github: "#"
    },
    {
      title: "Malvquest",
      description: "Fully responsive static website featuring modern UI/UX design and optimized performance.",
      tech: ["HTML", "CSS", "Tailwind CSS"],
      image: "static-web",
      link: "https://github.com/DhayananthG/malvquest",
      github: "https://github.com/DhayananthG/malvquest"
    },
     {
      title: "My Portfolio",
      description: "Personal portfolio website designed and developed from scratch without pre-defined codes.",
      tech: ["HTML", "CSS", "JS"],
      image: "portfolio",
      link: "https://dhayananthg.github.io/my-portfolio/",
      github: "https://github.com/DhayananthG/my-portfolio"
    }
  ],
  experience: [
    {
      role: "Senior AI Architect",
      company: "NeuralNet Systems",
      year: "2024 - Present",
      desc: "Leading a team of 12 engineers in developing proprietary LLM frameworks. Increased inference speed by 40% through custom kernel optimizations."
    },
    {
      role: "Full Stack Engineer",
      company: "CyberDyne Labs",
      year: "2022 - 2024",
      desc: "Architected a distributed microservices ecosystem handling 50k+ concurrent users. Integrated real-time anomaly detection pipelines."
    },
    {
        role: "Full-Stack Developer",
        company: "Freelance",
        year: "2021 - 2022",
        description: "Building responsive web apps, AI-driven solutions, and cloud-integrated projects."
     }
  ]
};
