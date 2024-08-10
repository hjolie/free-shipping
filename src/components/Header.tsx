"use client";
import React, { FC } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { signOut } from "firebase/auth";
import userAuth from "@/utils/userAuth";
import { useAuth } from "@/components/AuthStateCheck";

const Header: FC = React.memo(() => {
    const pathname = usePathname();
    const router = useRouter();
    const { uid } = useAuth();
    console.log("UID from Header: ", uid);

    const handleSignOut = async () => {
        try {
            await signOut(userAuth);
            alert("Successfully signed out.");
            router.replace("/");
        } catch (err) {
            console.error("Error signing out: ", err);
        }
    };

    return (
        <nav className="navbar p-4 bg-dark-ocean text-gray-light fixed top-0 left-0 right-0 shadow-md z-50">
            <div className="container px-12 py-3 mx-auto flex justify-between items-center max-w-1200">
                <h1 className="text-3xl font-bold text-teal-300 tracking-widest">
                    免運樂
                </h1>
                <div className="flex space-x-4">
                    <Link
                        href="/"
                        className={`text-xl hover:text-teal-300 hover:font-bold transition-colors duration-300 pt-1 ${
                            pathname === "/" ? "text-teal-300 font-bold" : ""
                        }`}
                    >
                        HOME
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
                    <button
                        onClick={() => alert("會員中心施工中")}
                        className="text-xl hover:text-teal-300 hover:font-bold transition-colors duration-300"
                        // href="/auth"
                        // className={`text-xl hover:text-teal-300 hover:font-bold transition-colors duration-300 ${
                        //     pathname === "/auth"
                        //         ? "text-teal-300 font-bold"
                        //         : ""
                        // }`}
                    >
                        會員中心
                    </button>
                    {/* <Link
                        href="/detail"
                        className={`text-xl hover:text-teal-300 hover:font-bold transition-colors duration-300 ${
                            pathname === "/detail"
                                ? "text-teal-300 font-bold"
                                : ""
                        }`}
                    >
                        DETAIL
                    </Link> */}

                    {!uid ? (
                        <button
                            onClick={() => router.push("/auth")}
                            className="bg-teal-600 text-white text-lg px-3 py-1 rounded-lg shadow-lg hover:bg-teal-700 hover:font-bold transition duration-300"
                            id="header-signin-btn"
                        >
                            登入
                        </button>
                    ) : (
                        // <Link
                        //     href="/auth"
                        //     className={`text-xl hover:text-teal-300 hover:font-bold transition-colors duration-300 ${
                        //         pathname === "/auth"
                        //             ? "text-teal-300 font-bold"
                        //             : ""
                        //     }`}
                        // >
                        //     登入
                        // </Link>
                        <button
                            onClick={handleSignOut}
                            // className="text-xl hover:text-teal-300 hover:font-bold transition-colors duration-300"
                            className="bg-teal-600 text-white text-lg px-3 py-1 rounded-lg shadow-lg hover:bg-teal-700 hover:font-bold transition duration-300"
                            id="header-signout-btn"
                        >
                            登出
                        </button>
                    )}
                </div>
            </div>
        </nav>
    );
});

export default Header;
