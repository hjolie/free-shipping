"use client";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { getDoc, doc, collection, addDoc } from "firebase/firestore/lite";
import db from "@/utils/db";
import { toast } from "sonner";

// const mockData = {
//     brand: "佳德",
//     product: "芋泥蛋黃酥",
//     price: 55,
//     url: "",
//     threshold: 2000,
//     currentTotal: 1500,
//     difference: 500,
//     closingDate: "",
//     otherInfo: "",
// };

interface BuyerFormType {
    name: string;
    quantity: number;
    note: string;
}

const initialBuyerFormData: BuyerFormType = {
    name: "",
    quantity: 1,
    note: "",
};

const Detail: React.FC = () => {
    const { id } = useParams();
    const [loading, setLoading] = useState(true); //animation
    const [groupBuyFormData, setGroupBuyFormData] = useState<any>(null);
    const [showBuyerForm, setShowBuyerForm] = useState(false);
    const [buyerFormData, setBuyerFormData] =
        useState<BuyerFormType>(initialBuyerFormData);
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
                        setGroupBuyFormData(docSnap.data());
                    } else {
                        console.error("Can't find the form with formId: ", id);
                        toast.error("此團購單不存在");
                        setTimeout(() => {
                            router.replace("/");
                        }, 3000);
                    }
                } catch (error) {
                    console.error("Error fetching doc: ", error);
                    toast.error("團購單讀取失敗");
                    setTimeout(() => {
                        router.replace("/");
                    }, 3000);
                }
            };
            fetchData();
        }
    }, [id]);

    const handleShowBuyerForm = () => {
        setShowBuyerForm(true);
        setTimeout(() => {
            const scrollHeight = document.body.scrollHeight;
            const viewHeight = window.innerHeight;
            const scrollPosition = scrollHeight - viewHeight + viewHeight * 0.1;
            window.scrollTo({
                top: scrollPosition,
                behavior: "smooth",
            });
        }, 300);
    };

    const createBuyerForm = async (
        newBuyerFormData: BuyerFormType
    ): Promise<string | null> => {
        try {
            const newDoc = await addDoc(collection(db, "buyers"), {
                ...newBuyerFormData,
                formId: id,
            });
            return newDoc.id;
        } catch (error) {
            console.error("Error adding new form to DB: ", error);
            return null;
        }
    };

    const handleBuyerFormSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const buyerId = await createBuyerForm(buyerFormData);

        if (buyerId) {
            toast.success("下單成功！", {
                duration: 2500,
            });
            setBuyerFormData(initialBuyerFormData);

            setTimeout(() => {
                router.replace("/form/joined");
            }, 3000);
        } else {
            console.error("Failed to retrieve the buyId");
            toast.error("下單失敗！請重新下單");

            setTimeout(() => {
                window.location.reload();
            }, 3000);
        }
    };

    const handleBuyerInputChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        const { name, value } = e.target;

        let newValue: string | number = value;

        if (name === "quantity") {
            newValue = value === "" ? "" : parseInt(value);
        }
        setBuyerFormData((prevFormData) => ({
            ...prevFormData,
            [name]: newValue,
        }));
    };

    return (
        <div className="min-h-screen bg-gray-900 text-gray-100 flex flex-col items-center p-4 mt-36 mb-12 space-y-12">
            {loading ? (
                <div className="fixed inset-4 pt-80 flex flex-col items-center">
                    <div className="loader"></div>
                    <h1 className="text-xl font-bold text-gray-300 mt-6">
                        載入中，請稍候...
                    </h1>
                </div>
            ) : (
                <>
                    <div className="w-full max-w-2xl bg-gray-800 rounded-lg shadow-lg p-8">
                        <h1 className="text-2xl font-bold text-teal-400 mb-10 text-center tracking-wider">
                            團購資訊
                        </h1>

                        <div className="space-y-6">
                            <div>
                                <h2 className="text-lg text-gray-300 block font-medium mb-1">
                                    品牌/商家名稱：
                                </h2>
                                <p className="text-lg w-full p-2 rounded-md bg-gray-700 text-gray-200 border border-gray-600">
                                    {groupBuyFormData.brand}
                                </p>
                            </div>
                            <div>
                                <h2 className="text-lg text-gray-300 block font-medium mb-1">
                                    商品：
                                </h2>
                                <p className="text-lg w-full p-2 rounded-md bg-gray-700 text-gray-200 border border-gray-600">
                                    {groupBuyFormData.product}
                                </p>
                            </div>
                            <div>
                                <h2 className="text-lg text-gray-300 block font-medium mb-1">
                                    價格：
                                </h2>
                                <p className="text-lg w-full p-2 rounded-md bg-gray-700 text-gray-200 border border-gray-600">
                                    {groupBuyFormData.price}
                                </p>
                            </div>
                            <div>
                                <h2 className="text-lg text-gray-300 block font-medium mb-1">
                                    商品網址：
                                </h2>
                                <p className="text-lg w-full p-2 rounded-md bg-gray-700 text-gray-200 border border-gray-600">
                                    {groupBuyFormData.url}
                                </p>
                            </div>
                            <div>
                                <h2 className="text-lg text-gray-300 block font-medium mb-1">
                                    免運門檻（＄）：
                                </h2>
                                <p className="text-lg w-full p-2 rounded-md bg-gray-700 text-gray-200 border border-gray-600">
                                    {groupBuyFormData.threshold}
                                </p>
                            </div>
                            <div>
                                <h2 className="text-lg text-gray-300 block font-medium mb-1">
                                    目前累積金額/團主份額（＄）：
                                </h2>
                                <p className="text-lg w-full p-2 rounded-md bg-gray-700 text-gray-200 border border-gray-600">
                                    {groupBuyFormData.currentTotal}
                                </p>
                            </div>
                            <div>
                                <h2 className="text-lg text-gray-300 block font-medium mb-1">
                                    免運差額（＄）：
                                </h2>
                                <p className="text-lg w-full p-2 rounded-md bg-gray-700 text-gray-200 border border-gray-600">
                                    {groupBuyFormData.difference}
                                </p>
                            </div>
                            <div>
                                <h2 className="text-lg text-gray-300 block font-medium mb-1">
                                    截止收單日：
                                </h2>
                                <p className="text-lg w-full p-2 rounded-md bg-gray-700 text-gray-200 border border-gray-600">
                                    {groupBuyFormData.closingDate}
                                </p>
                            </div>
                            <div>
                                <h2 className="text-lg text-gray-300 block font-medium mb-1">
                                    附加說明：
                                </h2>
                                <p className="text-lg w-full p-2 rounded-md bg-gray-700 text-gray-200 border border-gray-600">
                                    {groupBuyFormData.otherInfo}
                                </p>
                            </div>
                        </div>
                        <button
                            id="group-buy-join-btn"
                            className="w-full bg-teal-600 text-white text-lg py-2 px-4 rounded-md hover:bg-teal-700 hover:font-bold focus:outline-none focus:ring-2 focus:ring-teal-500"
                            onClick={handleShowBuyerForm}
                        >
                            ＋我要跟團
                        </button>
                    </div>

                    {showBuyerForm && (
                        <div className="w-full max-w-2xl bg-gray-800 rounded-lg shadow-lg p-8">
                            <h1 className="text-2xl font-bold text-teal-400 mb-10 text-center tracking-wider">
                                登記表單
                            </h1>
                            <form
                                onSubmit={handleBuyerFormSubmit}
                                className="space-y-6"
                            >
                                <div>
                                    <label
                                        htmlFor="name"
                                        className="text-lg block text-gray-300 mb-1"
                                    >
                                        姓名：
                                    </label>
                                    <input
                                        type="text"
                                        name="name"
                                        value={buyerFormData.name}
                                        onChange={handleBuyerInputChange}
                                        className="text-lg w-full p-2 mb-4 rounded-md bg-gray-700 text-gray-200 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-teal-500"
                                        required
                                    />
                                </div>
                                <div>
                                    <label
                                        htmlFor="quantity"
                                        className="text-lg block text-gray-300 mb-1"
                                    >
                                        數量：
                                    </label>
                                    <input
                                        type="number"
                                        name="quantity"
                                        value={buyerFormData.quantity}
                                        onChange={handleBuyerInputChange}
                                        className="text-lg w-full p-2 mb-4 rounded-md bg-gray-700 text-gray-200 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-teal-500"
                                        required
                                    />
                                </div>
                                <div>
                                    <label
                                        htmlFor="note"
                                        className="text-lg block text-gray-300 mb-1"
                                    >
                                        備註：
                                    </label>
                                    <textarea
                                        maxLength={200}
                                        id="note"
                                        name="note"
                                        value={buyerFormData.note}
                                        onChange={handleBuyerInputChange}
                                        className="text-lg w-full p-2 rounded-md bg-gray-700 text-gray-200 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-teal-500"
                                        placeholder="最多200字"
                                    />
                                </div>
                                <button
                                    type="submit"
                                    className="w-full bg-teal-600 text-white text-lg p-2 mt-5 rounded-md hover:bg-teal-700 hover:font-bold focus:outline-none focus:ring-2 focus:ring-teal-500"
                                >
                                    提交下單
                                </button>
                            </form>
                        </div>
                    )}
                </>
            )}
        </div>
    );
};

export default Detail;
