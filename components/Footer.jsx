import Link from "next/link";
import React from "react";

const Footer = () => {
  return (
    <footer className="shadow bg-black bg-opacity-45 ">
      <div className="w-full container p-4 md:py-8">
        <div className="sm:flex sm:items-center sm:justify-between">
          <Link
            href="/"
            className="flex items-center mb-4 sm:mb-0 space-x-3 rtl:space-x-reverse"
          >
            <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
              ANIME.TV
            </span>
          </Link>
          <ul className="flex flex-wrap items-center mb-6 text-sm font-medium text-gray-500 sm:mb-0 dark:text-gray-400">
            <li>
              <Link
                target="_blank"
                href="https://instagram.com/aimanyw_"
                className="hover:underline me-4 md:me-6"
              >
                Instagram
              </Link>
            </li>
            <li>
              <Link
                target="_blank"
                href="https://tiktok.com/@aimanyw_"
                className="hover:underline me-4 md:me-6"
              >
                Tiktok
              </Link>
            </li>
            <li>
              <Link
                target="_blank"
                href="https://x.com/aimanyus_"
                className="hover:underline me-4 md:me-6"
              >
                Twittwer
              </Link>
            </li>
            <li>
              <Link
                target="_blank"
                href="https://aimanyusuf.me"
                className="hover:underline me-4 md:me-6"
              >
                Website
              </Link>
            </li>
          </ul>
        </div>
        <hr className="my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8" />
        <span className="block text-sm text-gray-500 sm:text-center dark:text-gray-400">
          © 2023{" "}
          <Link
            target="_blank"
            href="https:://aimanyusuf.me"
            className="hover:underline"
          >
            Aiman Yusuf
          </Link>
          . All Rights Reserved.
        </span>
      </div>
    </footer>
  );
};

export default Footer;
