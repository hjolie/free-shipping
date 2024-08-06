"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

const LandingPage: React.FC = () => {
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
        // Loading Animation
        const timer = setTimeout(() => setLoading(false), 2000);
        return () => clearTimeout(timer);
    }, []);

    return (
        <div className="min-h-screen flex flex-col bg-gray-900 text-gray-200">
            <div className="flex-grow flex items-center justify-center">
                {loading ? (
                    <div className="flex flex-col items-center">
                        <div className="loader"></div>
                        <h1 className="text-xl font-bold text-gray-300 mt-6">
                            Loading ...
                        </h1>
                    </div>
                ) : (
                    <div className="flex flex-col items-center">
                        <h1 className="text-4xl font-bold text-teal-400 mb-10 tracking-wider">
                            揪親友 湊免運
                        </h1>
                        <p className="text-xl text-gray-300 mb-6">
                            - 建立親友團購單
                        </p>
                        <p className="text-xl text-gray-300 mb-10">
                            - 快速邀請、方便登記
                        </p>
                        <button
                            onClick={() => router.push("/auth")}
                            className="bg-teal-600 text-white text-xl px-6 py-3 rounded-lg shadow-lg hover:bg-teal-700 hover:font-bold transition duration-300"
                        >
                            立即開團
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default LandingPage;
