"use client";
import { useState } from "react";
import { toast } from "sonner";
import firebaseSignUp from "@/utils/FirebaseAuth/signUp";

const SignUpForm = ({
    setIsSignIn,
}: {
    setIsSignIn: (value: boolean) => void;
}) => {
    const [signUpEmail, setSignUpEmail] = useState("");
    const [signUpPassword, setSignUpPassword] = useState("");

    const handleSignUp = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            await firebaseSignUp(signUpEmail, signUpPassword);

            setSignUpEmail("");
            setSignUpPassword("");

            toast.success("註冊成功！登入後即可開團！");

            setTimeout(() => window.location.reload(), 3000);
        } catch (error) {
            const typedError = error as Error;

            if (typedError.message.includes("auth/email-already-in-use")) {
                console.error(typedError.message);
                toast.error("此電子郵件已被註冊！");
            } else if (typedError.message.includes("auth/weak-password")) {
                console.error(typedError.message);
                toast.error("密碼需至少6位數！");
            } else {
                console.error(typedError.message);
                toast.error("註冊失敗！請重新註冊");
            }

            setSignUpEmail("");
            setSignUpPassword("");
        }
    };

    return (
        <form onSubmit={handleSignUp}>
            <label htmlFor="email" className="text-lg block text-gray-300 mb-1">
                電子郵件：
            </label>
            <input
                type="email"
                value={signUpEmail}
                onChange={(e) => setSignUpEmail(e.target.value)}
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
                value={signUpPassword}
                onChange={(e) => setSignUpPassword(e.target.value)}
                className="text-lg w-full p-2 mb-4 rounded-md bg-gray-700 text-gray-200 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-teal-500"
                required
            />
            <button
                type="submit"
                className="w-full bg-teal-600 text-white text-lg p-2 mt-5 rounded-md hover:bg-teal-700 hover:font-bold focus:outline-none focus:ring-2 focus:ring-teal-500"
            >
                註冊
            </button>
            <p className="text-lg mt-5 text-center">
                已是會員請{" "}
                <button
                    onClick={() => setIsSignIn(true)}
                    className="text-teal-400 text-lg font-bold hover:underline"
                >
                    按此登入
                </button>
            </p>
        </form>
    );
};

export default SignUpForm;
