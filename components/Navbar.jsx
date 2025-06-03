import Link from "next/link";
import React from "react";
import SearchInput from "./Input/SearchInput";
import { authUserSession } from "@/lib/user-data-lib";
import Image from "next/image";
import { CiSearch } from "react-icons/ci";
import LoginModal from "./modal/LoginModal";

const Navbar = async () => {
  const user = await authUserSession();

  return (
    <nav className="absolute top-0 right-0 left-0 z-50">
      <div className="container">
        <div className="w-full px-4 flex justify-between py-6 flex-wrap items-center">
          <Link href={"/"} className="font-bold text-2xl mb-5 md:mb-0">
            <Image
              src={"/logo.svg"}
              width={160}
              height={90}
              alt="Anime TV Website Logo"
            />
          </Link>
          <div className="flex gap-5 items-center">
            <Link
              href={"/search"}
              className="md:hidden p-2 bg-black bg-opacity-50 rounded-full"
            >
              <CiSearch className="w-7 h-7" />
            </Link>
            <SearchInput />
            {user ? (
              <Link href={"/user"}>
                <Image
                  src={user.image}
                  alt={user.name}
                  width={40}
                  height={40}
                  className="rounded-full border"
                />
              </Link>
            ) : (
              <LoginModal />
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
