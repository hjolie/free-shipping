"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    setPersistence,
    inMemoryPersistence,
    browserSessionPersistence,
} from "firebase/auth";
import userAuth from "@/utils/userAuth";
import { useAuth } from "@/components/AuthStateCheck";

const UserPage: React.FC = () => {
    const [isSignIn, setIsSignIn] = useState(true);
    const [signInEmail, setSignInEmail] = useState("");
    const [signInPassword, setSignInPassword] = useState("");
    const [signUpEmail, setSignUpEmail] = useState("");
    const [signUpPassword, setSignUpPassword] = useState("");

    const router = useRouter();

    const { uid } = useAuth();

    useEffect(() => {
        console.log("UID from Auth: ", uid);
        if (uid) {
            router.push("/form");
        }
    }, [uid]);

    const handleSignIn = async (e: React.FormEvent) => {
        e.preventDefault();
        console.log(signInEmail);
        console.log(signInPassword);

        try {
            await setPersistence(userAuth, browserSessionPersistence);

            await signInWithEmailAndPassword(
                userAuth,
                signInEmail,
                signInPassword
            );

            setSignInEmail("");
            setSignInPassword("");

            alert("Signed in successfully! Please click OK to continue.");

            router.push("/form");
        } catch (err) {
            console.error("Error signing in: ", err);
        }
    };

    const handleSignUp = async (e: React.FormEvent) => {
        e.preventDefault();
        console.log(signUpEmail);
        console.log(signUpPassword);

        try {
            await setPersistence(userAuth, inMemoryPersistence);

            await createUserWithEmailAndPassword(
                userAuth,
                signUpEmail,
                signUpPassword
            );

            setSignUpEmail("");
            setSignUpPassword("");

            alert("Signed up successfully! Please sign in to continue.");

            window.location.reload();
        } catch (err) {
            console.error("Error signing up: ", err);
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-900 text-gray-200">
            <div className="bg-gray-800 p-8 rounded-lg shadow-lg max-w-md w-full">
                <h2 className="text-2xl font-bold mb-6 text-teal-400 text-center">
                    {isSignIn ? "登入" : "註冊"}
                </h2>
                {isSignIn ? (
                    <form onSubmit={handleSignIn}>
                        <label
                            htmlFor="email"
                            className="text-lg block text-gray-300 mb-1"
                        >
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
                ) : (
                    <form onSubmit={handleSignUp}>
                        <label
                            htmlFor="email"
                            className="text-lg block text-gray-300 mb-1"
                        >
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
                )}
            </div>
        </div>
    );
};

export default UserPage;
