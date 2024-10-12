import {
    FaFacebook,
    FaGithub,
    FaInstagram,
    FaTwitter,
  } from "react-icons/fa";
  import Link from "next/link";
  import Image from "next/image";
  

import logo from '../../../../public/logo.png'
  
  const items = [
    { name: "Facebook", icon: FaFacebook, link: "https://www.facebook.com/" },
    { name: "Instagram", icon: FaInstagram, link: "https://www.instagram.com/" },
    { name: "Twitter", icon: FaTwitter, link: "https://twitter.com/" },
    { name: "Github", icon: FaGithub, link: "https://github.com/" },
  ];
  
  const Footer = () => {
    return (
      <div className="w-full relative bg-sky-950 py-6 px-8 text-gray-300">
        <div className=" flex flex-col items-center">
          <Link href="/" className=" flex items-center justify-center gap-2 mb-5">
            <Image
              className="  rounded-full"
              src={logo}
              alt="logo"
              width={100}
              height={100}
            />
            <h2 className="font-bold text-lg md:text-xl lg:text-3xl text-white">
              Tech <span className="text-orange-500 hover:text-sky-400">Tips</span>
            </h2>
          </Link>
        </div>
  
        <div className="relative">
          <h1 className="text-center text-white underline font-bold my-4">
            Important Links
          </h1>
          <ul className="flex flex-col sm:flex-col lg:flex-row lg:justify-around lg:items-center text-center sm:text-sm lg:text-xl">
            <li>
              <Link
                href="/"
                className="text-white font-semibold hover:text-sky-400"
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                href="/booking"
                className="text-white font-semibold hover:text-sky-400"
              >
                Booking
              </Link>
            </li>
            <li>
              <Link
                href="/contact"
                className="text-white font-semibold hover:text-sky-400"
              >
                Contact
              </Link>
            </li>
            <li>
              <Link
                href="/about"
                className="text-white font-semibold hover:text-sky-400"
              >
                About Us
              </Link>
            </li>
          </ul>
          <div className="w-1/2 mx-auto my-4 text-white">
            <div className="flex justify-between pt-4 text-2xl text-white">
              {items.map((x, index) => {
                return (
                  <Link key={index} href={x.link} passHref>
                    <x.icon
                      className="size-6 cursor-pointer hover:text-sky-400 custom-transition"
                    />
                  </Link>
                );
              })}
            </div>
          </div>
          <p className="mt-auto text-center">all rights are reserved by @Tech Tips.com</p>
        </div>
      </div>
    );
  };
  
  export default Footer;
  