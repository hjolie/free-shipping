"use client";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useAuth } from "@/components/AuthStateCheck";
import { useSession } from "next-auth/react";
import { collection, getDocs, query, where } from "firebase/firestore/lite";
import db from "@/utils/db";
import Link from "next/link";

interface BuyersInfoType {
    name: string;
    quantity: number;
    note: string;
}

const Buyers: React.FC = () => {
    const { uid } = useAuth();
    const { id } = useParams();
    const { data: session } = useSession();
    const lineUid = session?.user?.id;
    let userId = uid ? uid : lineUid;
    const [loading, setLoading] = useState(true); //animation
    const router = useRouter();

    const searchParams = useSearchParams();
    const brand = searchParams.get("brand");
    const product = searchParams.get("product");
    const price = searchParams.get("price") ?? "0";
    const threshold = searchParams.get("threshold") ?? "0";
    const currentTotal = searchParams.get("currentTotal") ?? "0";

    const [buyersData, setBuyersData] = useState<BuyersInfoType[]>([]);

    // const [buyersData, setBuyersData] = useState([
    //     { name: "Item 1", quantity: 1, note: "hahaha" },
    //     { name: "Item 2", quantity: 2, note: "hehehe" },
    //     { name: "Item 3", quantity: 3, note: "heeheehee" },
    // ]);

    useEffect(() => {
        if (!uid && !lineUid) {
            router.replace("/user/auth");
        }
    }, [uid, session]);

    useEffect(() => {
        // Loading Animation
        const timer = setTimeout(() => setLoading(false), 2000);
        return () => clearTimeout(timer);
    }, []);

    useEffect(() => {
        if (userId) {
            if (id) {
                const fetchData = async () => {
                    try {
                        const buyersRef = collection(db, "buyers");
                        const queryDocs = query(
                            buyersRef,
                            where("formId", "==", id)
                        );
                        const querySnapshot = await getDocs(queryDocs);
                        const buyersData = querySnapshot.docs.map((doc) => ({
                            name: doc.data().name,
                            quantity: doc.data().quantity,
                            note: doc.data().note,
                        })) as BuyersInfoType[];

                        setBuyersData(buyersData);
                    } catch (err) {
                        console.error("Error fetching buyers info: ", err);
                    }
                };
                fetchData();
            }
        }
    }, [id]);

    const calculateSubtotal = (quantity: number) => {
        const result = quantity * parseInt(price);
        return result;
    };

    const calculateTotal = () => {
        const result = buyersData.reduce(
            (acc, data) => acc + calculateSubtotal(data.quantity),
            parseInt(currentTotal)
        );
        return result;
    };

    const calculateDifference = () => {
        const result = parseInt(threshold) - calculateTotal();
        if (result > 0) {
            return `$${result}`;
        } else {
            return "已達免運門檻！";
        }
    };

    if (!uid && !lineUid) {
        return null;
    }

    return (
        <div className="max-w-1100 mx-auto text-center text-lg bg-gray-900 text-gray-100 px-5 py-40">
            {loading ? (
                <div className="fixed inset-4 pt-80 flex flex-col items-center">
                    <div className="loader"></div>
                    <h1 className="text-xl font-bold text-gray-300 mt-6">
                        載入中，請稍候...
                    </h1>
                </div>
            ) : (
                <>
                    <h1 className="text-2xl font-bold text-teal-400 text-center tracking-wider">
                        商品資訊
                    </h1>
                    <table className="min-w-full bg-gray-800 text-gray-300 mt-5 mb-5">
                        <thead className="border-b border-gray-600">
                            <tr className="font-semibold">
                                <th className="py-3 px-4">品牌/商家</th>
                                <th className="py-3 px-4">商品</th>
                                <th className="py-3 px-4">價格</th>
                            </tr>
                        </thead>
                        <tbody className="bg-gray-700">
                            <tr className="border-b border-gray-600">
                                <td className="py-3 px-4">{brand}</td>
                                <td className="py-3 px-4">{product}</td>
                                <td className="py-3 px-4">${price}</td>
                            </tr>
                        </tbody>
                    </table>
                    <Link
                        href={`/user/detail/${id}`}
                        className="inline-block px-3 py-1 bg-gray-700 border border-gray-200 rounded-lg shadow-lg transition-transform transform hover:scale-105 hover:bg-teal-700 hover:shadow-2xl"
                    >
                        查看完整團購資訊、或編輯/刪除團購單
                    </Link>

                    <h1 className="text-2xl font-bold text-teal-400 mt-16 text-center tracking-wider">
                        免運進度
                    </h1>
                    <table className="min-w-full bg-gray-800 text-gray-300 mt-5">
                        <thead className="border-b border-gray-600">
                            <tr className="font-semibold">
                                <th className="py-3 px-4">免運門檻</th>
                                <th className="py-3 px-4">
                                    累積金額(含團主份額)
                                </th>
                                <th className="py-3 px-4">免運差額</th>
                            </tr>
                        </thead>
                        <tbody className="bg-gray-700">
                            <tr className="border-b border-gray-600">
                                <td className="py-3 px-4">${threshold}</td>
                                <td className="py-3 px-4">
                                    ${calculateTotal()}
                                </td>
                                <td className="py-3 px-4">
                                    {calculateDifference()}
                                </td>
                            </tr>
                        </tbody>
                    </table>

                    <h1 className="text-2xl font-bold text-teal-400 mt-16 text-center tracking-wider">
                        下單記錄
                    </h1>
                    <table className="min-w-full bg-gray-800 text-gray-300 mt-5 mb-10">
                        <thead className="border-b border-gray-600">
                            <tr className="font-semibold">
                                <th className="py-3 px-4">姓名</th>
                                <th className="py-3 px-4">數量</th>
                                <th className="py-3 px-4">備註</th>
                                <th className="py-3 px-4">小計</th>
                            </tr>
                        </thead>
                        <tbody className="bg-gray-700">
                            {buyersData.map((data, index) => (
                                <tr
                                    key={index}
                                    className="border-b border-gray-600"
                                >
                                    <td className="py-3 px-4">{data.name}</td>
                                    <td className="py-3 px-4">
                                        {data.quantity}
                                    </td>
                                    <td className="py-3 px-4">{data.note}</td>
                                    <td className="py-3 px-4">
                                        ${calculateSubtotal(data.quantity)}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </>
            )}
        </div>
    );
};

export default Buyers;
