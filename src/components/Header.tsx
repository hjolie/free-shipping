"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

const Header = () => {
    const pathname = usePathname();

    return (
        <nav className="navbar p-4 bg-dark-ocean text-gray-light fixed top-0 left-0 right-0 shadow-md z-50">
            <div className="container px-12 py-3 mx-auto flex justify-between items-center max-w-1200">
                <h1 className="text-3xl font-bold text-teal-300 tracking-widest">
                    免運樂
                </h1>
                <div className="flex space-x-4">
                    <Link
                        href="/"
                        className={`text-xl hover:text-teal-300 hover:font-bold transition-colors duration-300 ${
                            pathname === "/" ? "text-teal-300 font-bold" : ""
                        }`}
                    >
                        HOME
                    </Link>
                    <Link
                        href="/auth"
                        className={`text-xl hover:text-teal-300 hover:font-bold transition-colors duration-300 ${
                            pathname === "/auth"
                                ? "text-teal-300 font-bold"
                                : ""
                        }`}
                    >
                        會員中心
                    </Link>
                    <Link
                        href="/form"
                        className={`text-xl hover:text-teal-300 hover:font-bold transition-colors duration-300 ${
                            pathname === "/form"
                                ? "text-teal-300 font-bold"
                                : ""
                        }`}
                    >
                        WIP
                    </Link>
                </div>
            </div>
        </nav>
    );
};

export default Header;
