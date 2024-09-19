"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import useAuthContext from "@/hooks/useAuthContext";
import { useSession } from "next-auth/react";
import LineSignInForm from "@/components/userAuth/LineSignInForm";
import SignInForm from "@/components/userAuth/SignInForm";
import SignUpForm from "@/components/userAuth/SignUpForm";

const UserAuthPage: React.FC = () => {
    const [isSignIn, setIsSignIn] = useState(true);

    const router = useRouter();

    const { uid } = useAuthContext();
    const { data: session } = useSession();
    const lineUid = session?.user?.id;

    useEffect(() => {
        if (uid || lineUid) {
            router.replace("/form");
        }
    }, [uid, session]);

    if (uid || lineUid) return null;

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-900 text-gray-200 pt-40 sm:pt-36 md:pt-12 pb-32 md:pb-12">
            <div className="bg-gray-800 p-8 rounded-lg shadow-lg max-w-md w-full">
                <h2 className="text-2xl font-bold mb-6 text-teal-400 text-center">
                    {isSignIn ? "登入" : "註冊"}
                </h2>
                {isSignIn ? (
                    <>
                        <SignInForm setIsSignIn={setIsSignIn} />
                        <LineSignInForm />
                    </>
                ) : (
                    <>
                        <SignUpForm setIsSignIn={setIsSignIn} />
                        <LineSignInForm />
                    </>
                )}
            </div>
        </div>
    );
};

export default UserAuthPage;
