"use client";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { getDoc, doc, collection, addDoc } from "firebase/firestore/lite";
import db from "@/utils/db";

const data = {
    brand: "佳德",
    product: "芋泥蛋黃酥",
    price: 55,
    url: "",
    threshold: 2000,
    currentTotal: 1500,
    difference: 500,
    closingDate: "",
    otherInfo: "",
};

interface BuyerType {
    name: string;
    quantity: number;
    note: string;
}

const initialFormData: BuyerType = {
    name: "",
    quantity: 1,
    note: "",
};

const Detail: React.FC = () => {
    const { formId } = useParams();
    // const [data, setData] = useState<any>(null);
    const [loading, setLoading] = useState(true); //animation
    const [showForm, setShowForm] = useState(false);
    const [formData, setFormData] = useState(initialFormData);
    const router = useRouter();

    useEffect(() => {
        // Loading Animation
        const timer = setTimeout(() => setLoading(false), 2000);
        return () => clearTimeout(timer);
    }, []);

    // useEffect(() => {
    //     if (formId) {
    //         const fetchData = async () => {
    //             try {
    //                 const docRef = doc(db, "forms", formId as string);
    //                 const docSnap = await getDoc(docRef);

    //                 if (docSnap.exists()) {
    //                     setData(docSnap.data());
    //                 } else {
    //                     console.log("Can't find data with id: ", id);
    //                     alert(`Can't find data with formId: ${formId}`);
    //                     router.replace("/");
    //                 }
    //                 // console.log(id);
    //             } catch (error) {
    //                 console.error("Error fetching doc: ", error);
    //                 alert(`Error fetching doc: ${error}`);
    //                 router.replace("/");
    //             }
    //         };

    //         fetchData();
    //     }
    // }, [formId]);

    // if (!data) return <p>Data not found</p>;

    // console.log(data);

    const handleToggleForm = () => {
        setShowForm(true);
        setTimeout(() => {
            const scrollHeight = document.body.scrollHeight;
            const viewHeight = window.innerHeight;
            const scrollPosition = scrollHeight - viewHeight + viewHeight * 0.1;
            window.scrollTo({
                top: scrollPosition,
                behavior: "smooth",
            });
        }, 300);

        // setShowForm((prev) => {
        //     if (!prev) {
        //         setTimeout(() => {
        //             const scrollHeight = document.body.scrollHeight;
        //             const viewHeight = window.innerHeight;
        //             const scrollPosition =
        //                 scrollHeight - viewHeight + viewHeight * 0.1;
        //             window.scrollTo({
        //                 top: scrollPosition,
        //                 behavior: "smooth",
        //             });
        //         }, 300);
        //     }
        //     return !prev;
        // });
    };

    const createForm = async (
        newFormData: BuyerType
    ): Promise<string | null> => {
        try {
            const newDoc = await addDoc(collection(db, "buyers"), {
                ...newFormData,
                formId: formId,
            });
            return newDoc.id;
        } catch (error) {
            console.error("Error adding new form to DB: ", error);
            return null;
        }
    };

    const handleFormSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        console.log(formData);
        // const buyerId = await createForm(formData);

        // if (buyerId) {
        //     // console.log(buyId);
        //     alert("Congrats for placing an order!");
        //     setFormData(initialFormData);
        //     router.replace("/");
        // } else {
        //     console.error("Failed to retrieve the buyId");
        // }
    };

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        const { name, value } = e.target;

        let newValue: string | number = value;

        if (name === "quantity") {
            newValue = value === "" ? "" : parseInt(value);
        }
        setFormData((prevFormData) => ({
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
                            id="group-buy-join-btn"
                            className="w-full bg-teal-600 text-white text-lg py-2 px-4 rounded-md hover:bg-teal-700 hover:font-bold focus:outline-none focus:ring-2 focus:ring-teal-500"
                            onClick={handleToggleForm}
                        >
                            ＋我要跟團
                        </button>
                    </div>

                    {showForm && (
                        <div className="w-full max-w-2xl bg-gray-800 rounded-lg shadow-lg p-8">
                            <h1 className="text-2xl font-bold text-teal-400 mb-10 text-center tracking-wider">
                                團購登記單
                            </h1>
                            <form
                                onSubmit={handleFormSubmit}
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
                                        value={formData.name}
                                        onChange={handleChange}
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
                                        value={formData.quantity}
                                        onChange={handleChange}
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
                                        value={formData.note}
                                        onChange={handleChange}
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
