"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useEffect, useState, useRef } from "react";

export default function Home() {
  const projects = [
    {
      title: "URL Shortener",
      desc: "A modern URL shortening application that allows users to convert long links into clean, shareable short URLs. The project focuses on simplicity, fast performance, and user-friendly interaction, making link management efficient and convenient.",
      url: "https://bitlink-red.vercel.app/",
    },
    {
      title: "PassOp – Password Manager",
      desc: "A secure password management application designed to store and organize credentials safely. PassOp emphasizes usability and data handling, providing an intuitive interface to manage passwords while maintaining privacy and security best practices.",
      url: "https://passop-mongo-xi.vercel.app/",
    },
    {
      title: "Calculator",
      desc: "A responsive and interactive calculator application capable of handling basic arithmetic operations. The project demonstrates clean logic implementation, user interaction handling, and a smooth, intuitive UI.",
      url: "https://mycalculator-sooty-zeta.vercel.app/",
    },
  ];
  const texts = ["Hi, I am Khan Taaha", "I am Frontend Developer"];
  const [text, setText] = useState("");
  const [index, setIndex] = useState(0);
  const [deleting, setDeleting] = useState(false);
  const [active, setActive] = useState("home");

  const homeRef = useRef(null);
  const aboutRef = useRef(null);
  const projectsRef = useRef(null);

  // Typing animation
  useEffect(() => {
    const current = texts[index];
    const speed = deleting ? 60 : 100;

    const timer = setTimeout(() => {
      setText(
        deleting
          ? current.slice(0, text.length - 1)
          : current.slice(0, text.length + 1)
      );

      if (!deleting && text === current)
        setTimeout(() => setDeleting(true), 1200);
      if (deleting && text === "") {
        setDeleting(false);
        setIndex((prev) => (prev + 1) % texts.length);
      }
    }, speed);

    return () => clearTimeout(timer);
  }, [text, deleting, index]);

  // Scroll detection for active navbar
  useEffect(() => {
    const handleScroll = () => {
      if (!homeRef.current || !aboutRef.current || !projectsRef.current) return;

      const scrollY = window.scrollY + window.innerHeight / 2;

      if (scrollY >= projectsRef.current.offsetTop) setActive("projects");
      else if (scrollY >= aboutRef.current.offsetTop) setActive("about");
      else setActive("home");
    };

    // Delay initial check to prevent projects active on reload
    const timeout = setTimeout(() => handleScroll(), 100);

    window.addEventListener("scroll", handleScroll);

    return () => {
      clearTimeout(timeout);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const scrollToAbout = () => {
    if (aboutRef.current)
      aboutRef.current.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <main className="bg-gradient-to-b from-gray-900 to-gray-800 text-white">
      {/* NAVBAR */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-gradient-to-r from-gray-600 to-teal-500 shadow-lg">
        <div className="max-w-7xl mx-auto flex justify-between items-center px-6 py-4">
          <h2 className="text-xl font-bold text-white">My Portfolio</h2>
          <ul className="flex gap-8">
            <li className={active === "home" ? "border-b-2 border-white" : ""}>
              <Link
                href="home"
                className="hover:text-gray-300 transition-colors"
              >
                Home
              </Link>
            </li>
            <li className={active === "about" ? "border-b-2 border-white" : ""}>
              <Link
                href="#about"
                className="hover:text-gray-300 transition-colors"
              >
                About Me
              </Link>
            </li>
            <li
              className={active === "projects" ? "border-b-2 border-white" : ""}
            >
              <Link
                href="#projects"
                className="hover:text-gray-300 transition-colors"
              >
                Projects
              </Link>
            </li>
          </ul>
        </div>
      </nav>

      {/* HERO 1 */}
      <section
        ref={homeRef}
        id="home"
        className="h-screen flex flex-col justify-center items-center text-center pt-28 px-4"
      >
        <h3 className="text-lg mb-2 text-gray-300">Welcome</h3>
        <motion.h1
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-4xl md:text-5xl font-bold text-white mb-4"
        >
          {text}
          <span className="ml-1 animate-pulse">|</span>
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="text-gray-300 text-lg mb-6"
        >
          I build animated & modern websites
        </motion.p>
        <div className="flex gap-3">
          <a href= "https://bitlink-jade-alpha.vercel.app/"
          target="_blank"
          rel="noopener noreferrer"
          
          >
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={scrollToAbout}
            className="px-6 py-3 bg-blue-500 hover:bg-teal-400 text-white rounded-lg shadow-lg transition-colors"
          >
            View Work
          </motion.button>
          </a>
          <a  href="https://github.com/taahakhan18"
          target="_blank"
          rel="noopener noreferrer"
          
          >
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={scrollToAbout}
            className="px-6 py-3 bg-gray-500 hover:bg-gray-300 hover:text-black text-white rounded-lg shadow-lg transition-colors"
          >
            GitHub
          </motion.button>
          </a>
        </div>
      </section>

      {/* ABOUT ME */}
      <section
        id="about"
        ref={aboutRef}
        className="py-24 bg-gray-900 text-white"
      >
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">
          {/* IMAGE */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="flex justify-center"
          >
            <img
              src="/taaha.png"
              alt="Khan Taaha"
              className="w-72 h-72 md:w-80 md:h-80 object-cover rounded-xl shadow-2xl"
            />
          </motion.div>

          {/* TEXT */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h3 className="text-blue-400 text-lg mb-2">About Me</h3>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              I'm Khan Taaha
            </h2>
            <h4 className="text-xl text-gray-300 mb-6">Frontend Developer</h4>
            <p className="text-gray-400 leading-relaxed">
              Utilizing modern frontend technologies and animation techniques,
              my portfolio reflects a strong ability to transform creative ideas
              into engaging, high-performance web experiences.
              <br />
              <br />
              Through clean code, responsive layouts, and smooth animations, I
              build user-friendly interfaces that feel intuitive and visually
              appealing. My expertise in React, Next.js, Tailwind CSS, and
              Framer Motion allows me to craft modern web applications that
              deliver both beauty and performance.
            </p>
          </motion.div>
        </div>
      </section>

      {/* PROJECTS */}
      <section
        ref={projectsRef}
        id="projects"
        className="py-20 px-6 md:px-12 bg-gray-800 text-center"
      >
        <motion.h2
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          className="text-3xl md:text-4xl font-bold mb-10"
        >
          Projects
        </motion.h2>

        <div className="grid md:grid-cols-3 gap-8">
          {projects.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.2 }}
              whileHover={{ y: -10 }}
              className="bg-gray-900 p-8 rounded-xl shadow-lg w-full"
            >
              <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
              <p className="text-gray-300 w-full">{item.desc}</p>
              <div className="mt-4 flex gap-3 items-center justify-center">
                <a
                  href={item.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2  bg-blue-500 hover:bg-blue-600 rounded-md text-sm"
                >
                  Live Demo
                </a>
                <a
                  href="https://github.com/taahakhan18"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 bg-gray-800 text-white rounded-md hover:bg-gray-700 transition"
                >
                  GitHub
                </a>
              </div>
            </motion.div>
          ))}
        </div>
      </section>
    </main>
  );
}
