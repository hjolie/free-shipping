"use client";
import React, { FC } from "react";
import Link from "next/link";
import { useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useAuthContext } from "@/components/AuthStateCheck";
import { useSession } from "next-auth/react";
import Image from "next/image";
import SignOutBtn from "./userAuth/SignOutBtn";
import LineSignOutBtn from "./userAuth/LineSignOutBtn";

const Header: FC = React.memo(() => {
    const [openHamMenu, setOpenHamMenu] = useState(false);
    const pathname = usePathname();
    const router = useRouter();

    const { uid } = useAuthContext();

    const { data: session } = useSession();
    const lineUid = session?.user?.id;

    let userId = uid ? uid : lineUid;

    const toggleHamMenu = () => {
        setOpenHamMenu(!openHamMenu);
    };

    const closeHamMenu = () => {
        setOpenHamMenu(false);
    };

    return (
        <nav className="navbar p-4 bg-dark-ocean text-gray-light fixed top-0 left-0 right-0 shadow-md z-40">
            <div className="container px-12 py-3 mx-auto flex justify-between items-center max-w-1200">
                <Link
                    href="/"
                    className="text-3xl font-bold text-teal-300 tracking-wider"
                >
                    免運GO
                </Link>

                <div className="md:hidden">
                    <button
                        onClick={toggleHamMenu}
                        className="text-teal-300 focus:outline-none"
                        aria-label="Toggle hamburger menu"
                    >
                        <svg
                            className="w-8 h-8"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={3}
                                d="M4 6h16M4 12h16M4 18h16"
                            />
                        </svg>
                    </button>
                </div>
                <div className="hidden md:flex md:items-center md:space-x-4">
                    <Link
                        href="/"
                        className={`text-xl hover:text-teal-300 hover:font-bold transition-colors duration-300 pt-1 ${
                            pathname === "/" ? "text-teal-300 font-bold" : ""
                        }`}
                    >
                        首頁
                    </Link>
                    <Link
                        href="/form"
                        className={`text-xl hover:text-teal-300 hover:font-bold transition-colors duration-300 pt-1 ${
                            pathname === "/form"
                                ? "text-teal-300 font-bold"
                                : ""
                        }`}
                    >
                        開團
                    </Link>
                    <Link
                        href="/user"
                        className={`text-xl hover:text-teal-300 hover:font-bold transition-colors duration-300 pt-1 ${
                            pathname === "/user"
                                ? "text-teal-300 font-bold"
                                : ""
                        }`}
                    >
                        會員中心
                    </Link>

                    {!userId ? (
                        <button
                            onClick={() => router.push("/user/auth")}
                            className="bg-teal-600 text-white text-lg px-3 py-1 rounded-lg shadow-lg hover:bg-teal-700 hover:font-bold transition duration-300"
                            id="header-signin-btn"
                        >
                            登入
                        </button>
                    ) : uid ? (
                        <SignOutBtn id="header-signout-btn" />
                    ) : (
                        <LineSignOutBtn id="header-signout-btn" />
                    )}
                </div>
            </div>

            {/***** Sliding Hamburger Menu *****/}
            <div
                className={`fixed top-0 right-0 h-full bg-dark-ocean text-gray-light w-1/3 sm:w-1/4 transform ${
                    openHamMenu ? "translate-x-0" : "translate-x-full"
                } transition-transform duration-500 ease-in-out z-50 md:hidden`}
            >
                <div className="flex justify-end p-6">
                    <button
                        onClick={closeHamMenu}
                        className="text-teal-300 focus:outline-none"
                        aria-label="Close hamburger menu"
                    >
                        <svg
                            className="w-8 h-8"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={3}
                                d="M6 18L18 6M6 6l12 12"
                            />
                        </svg>
                    </button>
                </div>
                <div className="flex flex-col items-end p-6 sm:p-0 sm:pr-10 space-y-8 mt-6">
                    <div className="relative group">
                        <Link
                            href="/"
                            onClick={closeHamMenu}
                            className="text-xl"
                        >
                            <Image
                                src="/home.gif"
                                alt="首頁"
                                width={50}
                                height={50}
                                unoptimized
                                className="hover:animate-bounce"
                            />
                        </Link>
                        <span className="absolute top-0 left-0 transform -translate-y-[80%] -translate-x-[80%] w-max text-gray-light text-lg rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                            首頁
                        </span>
                    </div>

                    <div className="relative group">
                        <Link
                            href="/form"
                            onClick={closeHamMenu}
                            className="text-xl"
                        >
                            <Image
                                src="/document.gif"
                                alt="開團"
                                width={50}
                                height={50}
                                unoptimized
                                className="hover:animate-bounce"
                            />
                        </Link>
                        <span className="absolute top-0 left-0 transform -translate-y-[80%] -translate-x-full w-max text-gray-light text-lg rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                            開團
                        </span>
                    </div>

                    <div className="relative group">
                        <Link
                            href="/user"
                            onClick={closeHamMenu}
                            className="text-xl"
                        >
                            <Image
                                src="/avatar.gif"
                                alt="會員中心"
                                width={50}
                                height={50}
                                unoptimized
                                className="hover:animate-bounce"
                            />
                        </Link>
                        <span className="absolute top-0 left-0 transform -translate-y-[50%] -translate-x-[80%] w-max text-gray-light text-lg rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                            會員
                            <br />
                            中心
                        </span>
                    </div>

                    {!userId ? (
                        <button
                            onClick={() => {
                                router.push("/user/auth");
                                closeHamMenu();
                            }}
                            className="bg-teal-600 text-white text-lg px-3 py-1 rounded-lg shadow-lg hover:bg-teal-700 hover:font-bold transition duration-300 mt-20"
                            id="ham-signin-btn"
                        >
                            登入
                        </button>
                    ) : uid ? (
                        <SignOutBtn
                            closeHamMenu={closeHamMenu}
                            id="ham-signout-btn"
                        />
                    ) : (
                        <LineSignOutBtn
                            closeHamMenu={closeHamMenu}
                            id="ham-signout-btn"
                        />
                    )}
                </div>
            </div>
        </nav>
    );
});

export default Header;
