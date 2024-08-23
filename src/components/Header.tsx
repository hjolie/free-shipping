"use client";
import React, { FC } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { signOut } from "firebase/auth";
import userAuth from "@/utils/userAuth";
import { useAuth } from "@/components/AuthStateCheck";
import { toast } from "sonner";

const Header: FC = React.memo(() => {
    const pathname = usePathname();
    const router = useRouter();
    const { uid } = useAuth();

    const handleSignOut = async () => {
        try {
            await signOut(userAuth);
            toast.success("已登出！");
            router.replace("/");
        } catch (err) {
            console.error("Error signing out: ", err);
        }
    };

    return (
        <nav className="navbar p-4 bg-dark-ocean text-gray-light fixed top-0 left-0 right-0 shadow-md z-50">
            <div className="container px-12 py-3 mx-auto flex justify-between items-center max-w-1200">
                <Link
                    href="/"
                    className="text-3xl font-bold text-teal-300 tracking-wider"
                >
                    免運GO
                </Link>
                <div className="flex space-x-4">
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

                    {!uid ? (
                        <button
                            onClick={() => router.push("/user/auth")}
                            className="bg-teal-600 text-white text-lg px-3 py-1 rounded-lg shadow-lg hover:bg-teal-700 hover:font-bold transition duration-300"
                            id="header-signin-btn"
                        >
                            登入
                        </button>
                    ) : (
                        <button
                            onClick={handleSignOut}
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
