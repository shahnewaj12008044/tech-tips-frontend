"use client"

import { motion } from "framer-motion";

const organization = {
  name: "Tech Tips",
  mission:
    "At Tech Tips Hub, we aim to inspire and guide developers with expert tutorials, cutting-edge tech insights, and hands-on tips for modern web development, AI, and software engineering.",
  foundingYear: "Founded in 2024",
  description:
    "We are committed to building a vibrant community where developers of all levels can come together to learn, share, and collaborate on groundbreaking projects. Our platform offers a unique space for both beginners and seasoned experts to thrive and grow in the rapidly evolving tech landscape.",
  values: [
    "Community Collaboration",
    "Continuous Learning",
    "Innovation and Creativity",
    "Open Source Contribution",
    "Knowledge Sharing",
  ],
  image: "https://images.unsplash.com/photo-1551434678-e076c223a692"
};

const Organization = () => {
  return (
    <div className="py-20 px-8 bg-gradient-to-r from-gray-900 to-gray-800">
      <div className="max-w-6xl mx-auto flex flex-col items-center text-white">
        <motion.img
          src={organization.image}
          alt={organization.name}
          className="w-48 h-48 rounded-full mb-10 shadow-xl border-4 border-teal-400"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
        />
        <motion.h2
          className="text-4xl font-bold mb-6 text-teal-300"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {organization.name}
        </motion.h2>
        <motion.p
          className="text-xl text-teal-100 text-center mb-6 max-w-3xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {organization.mission}
        </motion.p>
        <motion.p
          className="text-lg text-gray-400 text-center mb-10"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          {organization.foundingYear}
        </motion.p>
        <motion.p
          className="text-md text-gray-300 text-center mb-12 max-w-4xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          {organization.description}
        </motion.p>
        <motion.div
          className="flex flex-wrap justify-center gap-6"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.8 }}
        >
          {organization.values.map((value, index) => (
            <motion.div
              key={index}
              className="bg-gray-700 hover:bg-teal-500 text-white shadow-md rounded-lg p-6 w-56 text-center transition-colors duration-300"
              whileHover={{ scale: 1.05 }}
            >
              <p className="font-semibold">{value}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default Organization;
