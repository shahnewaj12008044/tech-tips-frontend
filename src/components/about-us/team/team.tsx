'use client'
import { motion } from "framer-motion";
import Image from "next/image";
import team1 from "../../../../public/assets/team/team1.jpg";
import team2 from "../../../../public/assets/team/team2.jpg";
import team3 from "../../../../public/assets/team/team3.jpg";
import team4 from "../../../../public/assets/team/team4.jpg";
import team5 from "../../../../public/assets/team/team5.jpg";
import team6 from "../../../../public/assets/team/team6.jpg";

const teamMembers = [
  {
    name: "Johnson",
    role: "Web Developer",
    image: team1,
  },
  {
    name: "John Doe",
    role: "Software Engineer",
    image: team2,
  },
  {
    name: "Williams",
    role: "AI Specialist",
    image: team3,
  },
  {
    name: "Michael Brown",
    role: "Chief Technology Officer",
    image: team4,
  },
  {
    name: "David Wilson",
    role: "Lead Developer",
    image: team5,
  },
  {
    name: "Daniel",
    role: "Product Manager",
    image: team6,
  },
];

const Team = () => {
  return (
    <section className="py-20 bg-gray-900">
      <h2 className="text-4xl font-extrabold text-center mb-10 text-white">
        Meet Our <span className="text-teal-400">Team</span>
      </h2>

      <div className="flex flex-wrap justify-center gap-8 px-4">
        {teamMembers.map((member, index) => (
          <motion.div
            key={index}
            className="w-64 p-6 bg-gradient-to-r from-gray-800 to-gray-700 shadow-xl rounded-xl flex flex-col items-center hover:shadow-2xl hover:scale-105 transition-transform duration-300"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.2 }}
          >
            <Image
              src={member.image}
              alt={member.name}
              className="w-32 h-32 rounded-full border-4 border-teal-500 mb-6"
            />
            <h3 className="text-xl font-semibold text-white">{member.name}</h3>
            <p className="text-sm text-teal-300">{member.role}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default Team;
