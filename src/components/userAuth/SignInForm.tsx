"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import firebaseSignIn from "@/utils/FirebaseAuth/signIn";

const SignInForm = ({
    setIsSignIn,
}: {
    setIsSignIn: (value: boolean) => void;
}) => {
    const [signInEmail, setSignInEmail] = useState("guest@test.com");
    const [signInPassword, setSignInPassword] = useState("guest123");

    const router = useRouter();

    const handleSignIn = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            await firebaseSignIn(signInEmail, signInPassword);

            setSignInEmail("");
            setSignInPassword("");

            toast.success("登入成功！");

            router.replace("/form");
        } catch (error) {
            const typedError = error as Error;

            if (typedError.message.includes("auth/invalid-credential")) {
                console.error(typedError.message);
                toast.error("帳號或密碼錯誤！請重新登入");
            } else {
                console.error(typedError.message);
                toast.error("登入失敗！請重新登入");
            }

            setSignInEmail("");
            setSignInPassword("");
        }
    };

    return (
        <form onSubmit={handleSignIn}>
            <label htmlFor="email" className="text-lg block text-gray-300 mb-1">
                電子郵件：
            </label>
            <input
                type="email"
                value={signInEmail}
                onChange={(e) => setSignInEmail(e.target.value)}
                className="text-lg w-full p-2 mb-4 rounded-md bg-gray-700 text-gray-200 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-teal-500"
                required
            />
            <label
                htmlFor="password"
                className="text-lg block text-gray-300 mb-1"
            >
                密碼：
            </label>
            <input
                type="password"
                value={signInPassword}
                onChange={(e) => setSignInPassword(e.target.value)}
                className="text-lg w-full p-2 mb-4 rounded-md bg-gray-700 text-gray-200 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-teal-500"
                required
            />
            <button
                type="submit"
                className="w-full bg-teal-600 text-white text-lg p-2 mt-5 rounded-md hover:bg-teal-700 hover:font-bold focus:outline-none focus:ring-2 focus:ring-teal-500"
            >
                登入
            </button>
            <p className="text-lg mt-5 text-center">
                還不是會員嗎？{" "}
                <button
                    onClick={() => setIsSignIn(false)}
                    className="text-lg text-teal-400 font-bold hover:underline"
                >
                    立即註冊
                </button>
            </p>
        </form>
    );
};

export default SignInForm;
