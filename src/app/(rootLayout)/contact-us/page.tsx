"use client";
import { FaClock, FaEnvelope, FaMapMarker, FaPhone } from "react-icons/fa";
import contactAnimation from "../../../../public/assets/contact.json";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import dynamic from "next/dynamic";
import { SiMinutemailer } from "react-icons/si";
import { motion } from "framer-motion";
const Lottie = dynamic(() => import("lottie-react"), { ssr: false });


const features = [
  {
    icon: <FaPhone className="text-4xl text-teal-400" />,
    title: "Phone Number",
    description: "123456789",
  },
  {
    icon: <FaEnvelope className="text-4xl text-teal-400" />,
    title: "Email Address",
    description: "mezba@gmail.com",
  },
  {
    icon: <FaMapMarker className="text-4xl text-teal-400" />,
    title: "Location",
    description: "Dhaka, Bangladesh",
  },
  {
    icon: <FaClock className="text-4xl text-teal-400" />,
    title: "Opening Hours",
    description: "Mon - Sun (10.00AM - 04.30PM)",
  },
];

const ContactUs = () => {
  return (
    <div className="py-16 px-8 bg-gray-900">
      <h1 className="text-center font-bold text-3xl pt-8 tracking-wide text-white mb-12">
        Contact <span className="text-teal-400">Us</span>
      </h1>

      {/* Features Section */}
      <motion.section className="py-8" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6 }}>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
          {features.map((feature, index) => (
            <motion.div
              key={index}
            className="w-64 p-6 bg-gradient-to-r from-gray-800 to-gray-700 shadow-xl rounded-xl flex flex-col items-center hover:shadow-2xl hover:scale-105 transition-transform duration-300"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <div className="mb-4">{feature.icon}</div>
              <h3 className="text-xl font-semibold text-white">{feature.title}</h3>
              <p className="text-gray-300">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* Contact Form Section */}
      <div className="flex flex-col md:flex-row bg-gradient-to-r from-gray-800 to-gray-700 p-8 rounded-lg max-w-6xl mx-auto mt-12">
        {/* Lottie Animation */}
        <motion.div className="w-full md:w-1/2 mt-16" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.7 }}>
          <Lottie animationData={contactAnimation} loop={true} />
        </motion.div>

        {/* Form Section */}
        <motion.div className="w-full md:w-1/2 md:ml-6" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.7, delay: 0.2 }}>
          <h2 className="text-3xl font-bold mb-6 text-white">
            Get in <span className="text-teal-400">touch!</span>{" "}
          </h2>
          <form className="space-y-4">
            <div>
              <Label className="block text-sm font-medium text-gray-300">Name</Label>
              <Input
                type="text"
                className="mt-1 block w-full p-3 border border-gray-600 rounded-md bg-gray-900 text-white"
                placeholder="Your Name"
                required
              />
            </div>
            <div>
              <Label className="block text-sm font-medium text-gray-300">Email Address</Label>
              <Input
                type="email"
                className="mt-1 block w-full p-3 border border-gray-600 rounded-md bg-gray-900 text-white"
                placeholder="Your Email"
                required
              />
            </div>
            <div>
              <Label className="block text-sm font-medium text-gray-300">Phone Number</Label>
              <Input
                type="tel"
                className="mt-1 block w-full p-3 border border-gray-600 rounded-md bg-gray-900 text-white"
                placeholder="Your Phone Number"
                required
              />
            </div>
            <div>
              <Label className="block text-sm font-medium text-gray-300">Comments</Label>
              <Textarea
                className="mt-1 block w-full p-3 border border-gray-600 rounded-md bg-gray-900 text-white"
                placeholder="Your Comments"
                required
              ></Textarea>
            </div>
            <div>
              <Button
                type="submit"
                className="w-full flex items-center justify-center bg-teal-400 text-black py-2 rounded-lg hover:bg-teal-500"
              >
                <span className="mr-2">Send Enquiry</span> <SiMinutemailer className="text-xl" />
              </Button>
            </div>
          </form>
        </motion.div>
      </div>
    </div>
  );
};

export default ContactUs;
