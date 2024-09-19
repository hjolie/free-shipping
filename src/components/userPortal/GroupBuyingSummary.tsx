"use client";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import useAuthContext from "@/hooks/useAuthContext";
import { useSession } from "next-auth/react";
import Link from "next/link";
import BuyersDataType from "@/types/buyersDataType";
import getBuyersData from "@/utils/FirestoreDB/getBuyersData";
import useLoadingSpinner from "@/hooks/useLoadingSpinner";
import BuyersTable from "./BuyersTable";
import CalculationTable from "./CalculationTable";

const GroupBuyingSummary: React.FC = () => {
    const { uid } = useAuthContext();
    const { id } = useParams();
    const { data: session } = useSession();
    const lineUid = session?.user?.id;
    let userId = uid ? uid : lineUid;

    const router = useRouter();

    const searchParams = useSearchParams();
    const brand = searchParams.get("brand");
    const product = searchParams.get("product");
    const price = searchParams.get("price") ?? "0";
    const threshold = searchParams.get("threshold") ?? "0";
    const currentTotal = searchParams.get("currentTotal") ?? "0";

    const [buyersData, setBuyersData] = useState<BuyersDataType[]>([]);

    const { loading, spinner } = useLoadingSpinner();

    useEffect(() => {
        if (!uid && !lineUid) {
            router.replace("/user/auth");
        }
    }, [uid, session]);

    useEffect(() => {
        if (userId) {
            if (id) {
                const formId = Array.isArray(id) ? id[0] : id;
                const fetchBuyersData = async () => {
                    try {
                        const result = await getBuyersData(formId);
                        setBuyersData(result);
                    } catch (err) {
                        console.error("Error fetching buyers data: ", err);
                    }
                };
                fetchBuyersData();
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
                spinner
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
                    <CalculationTable
                        threshold={threshold}
                        calculateTotal={calculateTotal}
                        calculateDifference={calculateDifference}
                    />

                    <h1 className="text-2xl font-bold text-teal-400 mt-16 text-center tracking-wider">
                        下單記錄
                    </h1>
                    <BuyersTable
                        buyersData={buyersData}
                        calculateSubtotal={calculateSubtotal}
                    />
                </>
            )}
        </div>
    );
};

export default GroupBuyingSummary;
