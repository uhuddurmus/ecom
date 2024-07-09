"use client";
import Link from "next/link";
import React, { useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import { useTheme } from "next-themes";
const Navbar = () => {
  const [nav, setNav] = useState(false);
  const { theme, setTheme } = useTheme();

  const links = [
    {
      id: 1,
      link: "/",
      name: "Dashboard",
    },
    {
      id: 2,
      link: "/list",
      name: "List",
    },
  ];

  return (
    <div className="flex justify-between items-center w-full h-20 px-4 text-white bg-gray-700 dark:bg-black fixed top-0 z-50">
      <div>
        <h1 className="text-5xl font-signature ml-2">
          <a
            className="link-underline link-underline-black"
            href=""
            target="_blank"
            rel="noreferrer"
          >
            Codio
          </a>
        </h1>
      </div>

      <ul className="hidden md:flex">
        {links.map((item) => (
          <li
            key={item.id}
            className="nav-links px-4 cursor-pointer capitalize font-medium text-gray-500 hover:scale-105 hover:text-white duration-200 link-underline"
          >
            <Link href={item.link}>{item.name}</Link>
          </li>
        ))}
      </ul>

      <div
        onClick={() => setNav(!nav)}
        className="cursor-pointer pr-4 z-10 text-gray-500 md:hidden"
      >
        {nav ? <FaTimes size={30} /> : <FaBars size={30} />}
      </div>

      {nav && (
        <ul className="flex flex-col justify-center items-center fixed top-0 left-0 w-full h-screen bg-gradient-to-b from-black to-gray-800 text-gray-500 z-40">
          {links.map(({ id, link }) => (
            <li
              key={id}
              className="px-4 cursor-pointer capitalize py-6 text-4xl"
            >
              <Link onClick={() => setNav(!nav)} href={link}>
                {link}
              </Link>
            </li>
          ))}
        </ul>
      )}
      <button onClick={() => setTheme(theme === "dark" ? "light" : "dark")}>
      {theme && theme.charAt(0).toUpperCase() + theme.slice(1)}
      </button>

    </div>
  );
};

export default Navbar;
