"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import PopUpInfo from "@/components/PopUpInfo";
import Image from "next/image";

const LandingPage: React.FC = () => {
    const router = useRouter();
    const [showPopUp, setShowPopUp] = useState(false);

    return (
        <div className="min-h-screen flex flex-col bg-gray-900 text-gray-200">
            <div className="flex-grow flex flex-col items-center justify-center space-y-20 mt-20 px-4 md:mt-14">
                <div className="flex flex-col items-center space-y-10 text-center md:flex-row md:gap-x-10">
                    <div className="space-y-6 md:order-2 md:space-y-8">
                        <h1 className="text-4xl xl:text-5xl font-bold text-teal-400 tracking-wide animate-from-left">
                            免運GO 免運購
                        </h1>
                        <h1 className="text-4xl xl:text-5xl font-bold text-teal-400 tracking-wider animate-from-right">
                            揪親友 湊免運
                        </h1>
                        <div className="space-y-4 animate-from-bottom md:pt-5">
                            <p className="text-xl xl:text-2xl text-gray-300">
                                ·建立親友/同事團購單
                            </p>
                            <p className="text-xl xl:text-2xl text-gray-300">
                                ·同湊免運或店家低消
                            </p>
                            <p className="text-xl xl:text-2xl text-gray-300">
                                ·快速開團、方便登記
                            </p>
                        </div>
                    </div>

                    <div className="md:order-1">
                        <Image
                            src="/trolley.gif"
                            alt=""
                            width={100}
                            height={100}
                            className="sm:w-[120px] sm:h-[120px] md:w-[150px] md:h-[150px] lg:w-[200px] lg:h-[200px] max-w-full h-auto"
                            unoptimized
                        />
                    </div>
                </div>
                <div className="flex flex-col space-y-4 md:space-y-0 md:flex-row justify-center md:space-x-14">
                    <button
                        onClick={() => router.push("/user/auth")}
                        className="bg-teal-600 text-white text-xl xl:text-2xl px-6 py-3 md:px-8 md:py-4 rounded-lg shadow-lg transform transition-transform hover:scale-105 hover:bg-teal-700 hover:font-bold duration-300 animate-from-left"
                    >
                        立即開團
                    </button>

                    <button
                        onClick={() => setShowPopUp(true)}
                        className="bg-gray-700 text-gray-300 text-xl xl:text-2xl px-6 py-3 md:px-8 md:py-4 rounded-lg shadow-lg hover:bg-gray-600 hover:scale-105 hover:font-bold transform transition-transform duration-300 animate-from-right"
                    >
                        了解更多
                    </button>
                </div>
            </div>

            <PopUpInfo show={showPopUp} onClose={() => setShowPopUp(false)} />
        </div>
    );

    // return (
    //     <div className="min-h-screen flex flex-col bg-gray-900 text-gray-200">

    //         <div className="flex-grow flex items-center justify-center overflow-y-auto">

    //             <div className="flex flex-col items-center mt-14 px-4 text-center space-y-10 xl:space-y-14">

    //                 <div className="space-y-6">
    //                     <h1 className="text-4xl xl:text-5xl font-bold text-teal-400 tracking-wide animate-from-left">
    //                         免運GO 免運購
    //                     </h1>
    //                     <h1 className="text-4xl xl:text-5xl font-bold text-teal-400 tracking-wider animate-from-right">
    //                         揪親友 湊免運
    //                     </h1>
    //                     <Image
    //                         src="/trolley.gif"
    //                         alt=""
    //                         width={300}
    //                         height={300}
    //                         className="max-w-full h-auto"
    //                         unoptimized
    //                     />
    //                 </div>

    //                 <div className="space-y-4 animate-from-bottom">
    //                     <p className="text-xl xl:text-2xl text-gray-300">
    //                         ·建立親友/同事團購單
    //                     </p>
    //                     <p className="text-xl xl:text-2xl text-gray-300">
    //                         ·同湊免運或店家低消
    //                     </p>
    //                     <p className="text-xl xl:text-2xl text-gray-300">
    //                         ·快速開團、方便登記
    //                     </p>
    //                 </div>

    //                 <div className="flex flex-col space-y-4">
    //                     <button
    //                         onClick={() => router.push("/user/auth")}
    //                         className="bg-teal-600 text-white text-xl xl:text-2xl px-6 py-3 lx:px-8 xl:py-4 rounded-lg shadow-lg transform transition-transform hover:scale-105 hover:bg-teal-700 hover:font-bold duration-300 animate-from-left"
    //                     >
    //                         立即開團
    //                     </button>

    //                     <button
    //                         onClick={() => setShowPopUp(true)}
    //                         className="bg-gray-700 text-gray-300 text-xl xl:text-2xl px-6 py-3 lx:px-8 xl:py-4 rounded-lg shadow-lg hover:bg-gray-600 hover:scale-105 hover:font-bold transform transition-transform duration-300 animate-from-right"
    //                     >
    //                         了解更多
    //                     </button>
    //                 </div>
    //             </div>
    //         </div>

    //         <PopUpInfo show={showPopUp} onClose={() => setShowPopUp(false)} />
    //     </div>
    // );

    // return (
    //     <div className="min-h-screen flex flex-col bg-gray-900 text-gray-200">
    //         <div className="flex-grow flex items-center justify-center">
    //             <div className="flex flex-col items-center mt-14">
    //                 <h1 className="text-4xl font-bold text-teal-400 mb-10 tracking-wide">
    //                     免運GO 免運購
    //                 </h1>
    //                 <h1 className="text-4xl font-bold text-teal-400 mb-10 tracking-wider">
    //                     揪親友 湊免運
    //                 </h1>
    //                 <p className="text-xl text-gray-300 mb-6">
    //                     ·建立親友/同事團購單
    //                 </p>
    //                 <p className="text-xl text-gray-300 mb-6">
    //                     ·同湊免運或店家低消
    //                 </p>
    //                 <p className="text-xl text-gray-300 mb-10">
    //                     ·快速開團、方便登記
    //                 </p>
    //                 <button
    //                     onClick={() => router.push("/user/auth")}
    //                     className="bg-teal-600 text-white text-xl px-6 py-3 rounded-lg shadow-lg hover:bg-teal-700 hover:font-bold transition duration-300"
    //                 >
    //                     立即開團
    //                 </button>
    //             </div>
    //         </div>
    //     </div>
    // );
};

export default LandingPage;
