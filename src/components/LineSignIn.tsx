"use client";
import { signIn } from "next-auth/react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

const LineSignIn = () => {
    const [imgSrc, setImgSrc] = useState("/line/btn_base.png");
    const router = useRouter();

    const handleMouseEnter = () => {
        setImgSrc("/line/btn_hover.png");
    };

    const handleMouseLeave = () => {
        setImgSrc("/line/btn_base.png");
    };

    const handleMouseDown = () => {
        setImgSrc("/line/btn_press.png");
    };

    const handleMouseUp = () => {
        setImgSrc("/line/btn_hover.png");
    };

    const handleLineSignIn = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            await signIn("line", { redirectTo: "/form" });
        } catch (error) {
            console.error(error);
            toast.error("登入失敗！請重新登入");
        }
    };

    return (
        <form
            onSubmit={handleLineSignIn}
            className="border-t border-gray-300 mt-8"
        >
            <button
                type="submit"
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
                onMouseDown={handleMouseDown}
                onMouseUp={handleMouseUp}
                className="w-full h-11 bg-[#06c755] text-white text-lg mt-8 rounded-md flex justify-between items-center hover:bg-[#05B34D] hover:font-bold focus:bg-[#048B3C] focus:outline-none focus:ring-1 focus:ring-[#048B3C] transition duration-500 ease-in-out"
            >
                <img
                    src={imgSrc}
                    alt="LINE Logo"
                    className="h-11 object-contain border-r border-[#141414]"
                />
                <p className="w-full text-center tracking-widest">
                    使用LINE登入
                </p>
            </button>
        </form>
    );
};

export default LineSignIn;
