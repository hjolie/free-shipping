"use client";
import { useRouter } from "next/navigation";

const LandingPage: React.FC = () => {
    const router = useRouter();

    return (
        <div className="min-h-screen flex flex-col bg-gray-900 text-gray-200">
            <div className="flex-grow flex items-center justify-center">
                <div className="flex flex-col items-center mt-14">
                    <h1 className="text-4xl font-bold text-teal-400 mb-10 tracking-wide">
                        免運GO 免運購
                    </h1>
                    <h1 className="text-4xl font-bold text-teal-400 mb-10 tracking-wider">
                        揪親友 湊免運
                    </h1>
                    <p className="text-xl text-gray-300 mb-6">
                        ·建立親友/同事團購單
                    </p>
                    <p className="text-xl text-gray-300 mb-6">
                        ·同湊免運或店家低消
                    </p>
                    <p className="text-xl text-gray-300 mb-10">
                        ·快速開團、方便登記
                    </p>
                    <button
                        onClick={() => router.push("/user/auth")}
                        className="bg-teal-600 text-white text-xl px-6 py-3 rounded-lg shadow-lg hover:bg-teal-700 hover:font-bold transition duration-300"
                    >
                        立即開團
                    </button>
                </div>
            </div>
        </div>
    );
};

export default LandingPage;
