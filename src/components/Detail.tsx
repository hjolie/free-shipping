"use client";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { getDoc, doc } from "firebase/firestore/lite";
import db from "@/utils/db";

const Detail = () => {
    const { id } = useParams();
    const [data, setData] = useState<any>(null);
    const [loading, setLoading] = useState(true); //animation
    const router = useRouter();

    useEffect(() => {
        // Loading Animation
        const timer = setTimeout(() => setLoading(false), 2000);
        return () => clearTimeout(timer);
    }, []);

    useEffect(() => {
        if (id) {
            const fetchData = async () => {
                try {
                    const docRef = doc(db, "forms", id as string);
                    const docSnap = await getDoc(docRef);

                    if (docSnap.exists()) {
                        setData(docSnap.data());
                    } else {
                        console.log("Can't find data with id: ", id);
                        alert(`Can't find data with id: ${id}`);
                        router.replace("/");
                    }
                    console.log(id);
                } catch (error) {
                    console.error("Error fetching doc: ", error);
                    alert(`Error fetching doc: ${error}`);
                    router.replace("/");
                }
            };

            fetchData();
        }
    }, [id]);

    if (!data) return <p>Data not found</p>;

    console.log(data);

    return (
        <div className="min-h-screen bg-gray-900 text-gray-100 flex items-center justify-center p-4 mt-36 mb-12">
            {loading ? (
                <div className="flex flex-col items-center">
                    <div className="loader"></div>
                    <h1 className="text-xl font-bold text-gray-300 mt-6">
                        建單中，請稍候...
                    </h1>
                </div>
            ) : (
                <div className="w-full max-w-2xl bg-gray-800 rounded-lg shadow-lg p-8">
                    <h1 className="text-2xl font-bold text-teal-400 mb-10 text-center">
                        團購單
                    </h1>

                    <div className="space-y-6">
                        <div>
                            <h2 className="text-lg text-gray-300 block font-medium mb-1">
                                品牌/商家名稱：
                            </h2>
                            <p className="text-lg w-full p-2 rounded-md bg-gray-700 text-gray-200 border border-gray-600">
                                {data.brand}
                            </p>
                        </div>
                        <div>
                            <h2 className="text-lg text-gray-300 block font-medium mb-1">
                                商品：
                            </h2>
                            <p className="text-lg w-full p-2 rounded-md bg-gray-700 text-gray-200 border border-gray-600">
                                {data.product}
                            </p>
                        </div>
                        <div>
                            <h2 className="text-lg text-gray-300 block font-medium mb-1">
                                價格：
                            </h2>
                            <p className="text-lg w-full p-2 rounded-md bg-gray-700 text-gray-200 border border-gray-600">
                                {data.price}
                            </p>
                        </div>
                        <div>
                            <h2 className="text-lg text-gray-300 block font-medium mb-1">
                                商品網址：
                            </h2>
                            <p className="text-lg w-full p-2 rounded-md bg-gray-700 text-gray-200 border border-gray-600">
                                {data.url}
                            </p>
                        </div>
                        <div>
                            <h2 className="text-lg text-gray-300 block font-medium mb-1">
                                免運門檻（＄）：
                            </h2>
                            <p className="text-lg w-full p-2 rounded-md bg-gray-700 text-gray-200 border border-gray-600">
                                {data.threshold}
                            </p>
                        </div>
                        <div>
                            <h2 className="text-lg text-gray-300 block font-medium mb-1">
                                目前累積金額（＄）：
                            </h2>
                            <p className="text-lg w-full p-2 rounded-md bg-gray-700 text-gray-200 border border-gray-600">
                                {data.currentTotal}
                            </p>
                        </div>
                        <div>
                            <h2 className="text-lg text-gray-300 block font-medium mb-1">
                                還差多少金額（＄）：
                            </h2>
                            <p className="text-lg w-full p-2 rounded-md bg-gray-700 text-gray-200 border border-gray-600">
                                {data.difference}
                            </p>
                        </div>
                        <div>
                            <h2 className="text-lg text-gray-300 block font-medium mb-1">
                                截止收單日：
                            </h2>
                            <p className="text-lg w-full p-2 rounded-md bg-gray-700 text-gray-200 border border-gray-600">
                                {data.closingDate}
                            </p>
                        </div>
                        <div>
                            <h2 className="text-lg text-gray-300 block font-medium mb-1">
                                附加說明：
                            </h2>
                            <p className="text-lg w-full p-2 rounded-md bg-gray-700 text-gray-200 border border-gray-600">
                                {data.otherInfo}
                            </p>
                        </div>
                    </div>
                    <button
                        id="group-buy-edit-btn"
                        className="w-full bg-teal-600 text-white text-lg py-2 px-4 rounded-md hover:bg-teal-700 hover:font-bold focus:outline-none focus:ring-2 focus:ring-teal-500"
                        onClick={() =>
                            alert("Edit functionality not implemented yet")
                        }
                    >
                        Edit
                    </button>
                </div>
            )}
        </div>
    );
};

export default Detail;
