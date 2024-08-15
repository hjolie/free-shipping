"use client";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useAuth } from "@/components/AuthStateCheck";
import { getDoc, doc, updateDoc, deleteDoc } from "firebase/firestore/lite";
import db from "@/utils/db";

// const data = {
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

const UserFormDetail: React.FC = () => {
    const { uid } = useAuth();
    const { id } = useParams();
    const [loading, setLoading] = useState(true); //animation
    const router = useRouter();
    const [isEditing, setIsEditing] = useState(false);
    const [originalValues, setOriginalValues] = useState<{
        [key: string]: string | number;
    }>({});
    const [currentValues, setCurrentValues] = useState<{
        [key: string]: string | number;
    }>({});

    useEffect(() => {
        console.log("UID from UserFormDetail: ", uid);
        if (!uid) {
            router.replace("/user/auth");
        }
    }, [uid]);

    if (!uid) {
        return null;
    }

    useEffect(() => {
        // Loading Animation
        const timer = setTimeout(() => setLoading(false), 2000);
        return () => clearTimeout(timer);
    }, []);

    useEffect(() => {
        if (uid) {
            if (id) {
                const fetchData = async () => {
                    try {
                        const docRef = doc(db, "forms", id as string);
                        const docSnap = await getDoc(docRef);

                        if (docSnap.exists()) {
                            setOriginalValues(
                                docSnap.data() as {
                                    [key: string]: string | number;
                                }
                            );
                            setCurrentValues(
                                docSnap.data() as {
                                    [key: string]: string | number;
                                }
                            );
                        } else {
                            console.log("Can't find the form with id: ", id);
                            alert(`Can't find the form with formId: ${id}`);
                            router.replace("/");
                        }
                    } catch (error) {
                        console.error("Error fetching doc: ", error);
                        alert(`Error fetching doc: ${error}`);
                        router.replace("/");
                    }
                };
                fetchData();
            }
        }
    }, [id]);

    console.log("Original from fetch: ", originalValues.product);
    console.log("Current from fetch: ", currentValues.product);

    const handleSaveBtn = async (e: React.FormEvent) => {
        e.preventDefault();
        console.log("Save btn clicked: ", currentValues.product);
        try {
            const updatedFields = Object.keys(currentValues).reduce(
                (acc, key) => {
                    if (currentValues[key] !== originalValues[key]) {
                        acc[key] = currentValues[key];
                    }
                    return acc;
                },
                {} as { [key: string]: string | number }
            );

            console.log("Updated: ", updatedFields);

            if (Object.keys(updatedFields).length > 0) {
                const docRef = doc(db, "forms", id as string);

                await updateDoc(docRef, updatedFields);

                setOriginalValues(currentValues);
                setIsEditing(false);
                alert("GroupBuy Info updated successfully!");
                // router.replace(`/user/detail/${id}`);
            } else {
                alert("No changes detected.");
                setIsEditing(false);
            }
        } catch (error) {
            console.error("Error updating the form: ", error);
        }
    };

    const handleUserInputChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        const { name, value } = e.target;

        let newValue: string | number = value;

        if (
            name === "price" ||
            name === "threshold" ||
            name === "currentTotal" ||
            name === "difference"
        ) {
            newValue = value === "" ? "" : parseInt(value);
        }

        setCurrentValues((prevInputValues) => ({
            ...prevInputValues,
            [name]: newValue,
        }));
    };

    const handleDeleteBtn = async () => {
        alert("Are you sure to delete this form?");

        try {
            await deleteDoc(doc(db, "forms", id as string));
            router.replace("/user");
        } catch (err) {
            console.error(`Error deleting the form - ${id}: `, err);
        }
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
                    {!isEditing ? (
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
                                        {originalValues.brand}
                                    </p>
                                </div>
                                <div>
                                    <h2 className="text-lg text-gray-300 block font-medium mb-1">
                                        商品：
                                    </h2>
                                    <p className="text-lg w-full p-2 rounded-md bg-gray-700 text-gray-200 border border-gray-600">
                                        {originalValues.product}
                                    </p>
                                </div>
                                <div>
                                    <h2 className="text-lg text-gray-300 block font-medium mb-1">
                                        價格：
                                    </h2>
                                    <p className="text-lg w-full p-2 rounded-md bg-gray-700 text-gray-200 border border-gray-600">
                                        {originalValues.price}
                                    </p>
                                </div>
                                <div>
                                    <h2 className="text-lg text-gray-300 block font-medium mb-1">
                                        商品網址：
                                    </h2>
                                    <p className="text-lg w-full p-2 rounded-md bg-gray-700 text-gray-200 border border-gray-600">
                                        {originalValues.url}
                                    </p>
                                </div>
                                <div>
                                    <h2 className="text-lg text-gray-300 block font-medium mb-1">
                                        免運門檻（＄）：
                                    </h2>
                                    <p className="text-lg w-full p-2 rounded-md bg-gray-700 text-gray-200 border border-gray-600">
                                        {originalValues.threshold}
                                    </p>
                                </div>
                                <div>
                                    <h2 className="text-lg text-gray-300 block font-medium mb-1">
                                        目前累積金額（＄）：
                                    </h2>
                                    <p className="text-lg w-full p-2 rounded-md bg-gray-700 text-gray-200 border border-gray-600">
                                        {originalValues.currentTotal}
                                    </p>
                                </div>
                                <div>
                                    <h2 className="text-lg text-gray-300 block font-medium mb-1">
                                        還差多少金額（＄）：
                                    </h2>
                                    <p className="text-lg w-full p-2 rounded-md bg-gray-700 text-gray-200 border border-gray-600">
                                        {originalValues.difference}
                                    </p>
                                </div>
                                <div>
                                    <h2 className="text-lg text-gray-300 block font-medium mb-1">
                                        截止收單日：
                                    </h2>
                                    <p className="text-lg w-full p-2 rounded-md bg-gray-700 text-gray-200 border border-gray-600">
                                        {originalValues.closingDate}
                                    </p>
                                </div>
                                <div>
                                    <h2 className="text-lg text-gray-300 block font-medium mb-1">
                                        附加說明：
                                    </h2>
                                    <p className="text-lg w-full p-2 rounded-md bg-gray-700 text-gray-200 border border-gray-600">
                                        {originalValues.otherInfo}
                                    </p>
                                </div>
                            </div>
                            <button
                                id="user-form-edit-btn"
                                className="w-full bg-teal-600 text-white text-lg py-2 px-4 rounded-md hover:bg-teal-700 hover:font-bold focus:outline-none focus:ring-2 focus:ring-teal-500"
                                onClick={() => setIsEditing(true)}
                            >
                                編輯
                            </button>
                            <button
                                id="user-form-delete-btn"
                                className="w-full bg-teal-600 text-white text-lg py-2 px-4 mt-5 rounded-md hover:bg-teal-700 hover:font-bold focus:outline-none focus:ring-2 focus:ring-teal-500"
                                onClick={handleDeleteBtn}
                            >
                                刪除
                            </button>
                        </div>
                    ) : (
                        <div className="w-full max-w-lg bg-gray-800 rounded-lg shadow-lg p-8">
                            <h1 className="text-2xl font-bold text-teal-400 mb-10 text-center tracking-wide">
                                編輯團購資訊
                            </h1>
                            <form
                                className="space-y-6"
                                onSubmit={handleSaveBtn}
                            >
                                <div>
                                    <label
                                        htmlFor="brand"
                                        className="text-lg text-gray-300 block font-medium mb-1"
                                    >
                                        品牌/商家名稱：
                                    </label>
                                    <input
                                        type="text"
                                        id="brand"
                                        name="brand"
                                        value={currentValues.brand}
                                        onChange={handleUserInputChange}
                                        className="text-lg w-full p-2 rounded-md bg-gray-700 text-gray-200 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-teal-500"
                                        required
                                    />
                                </div>
                                <div>
                                    <label
                                        htmlFor="product"
                                        className="block text-lg text-gray-300 font-medium mb-1"
                                    >
                                        商品：
                                    </label>
                                    <input
                                        type="text"
                                        id="product"
                                        name="product"
                                        value={currentValues.product}
                                        onChange={handleUserInputChange}
                                        className="text-lg w-full p-2 rounded-md bg-gray-700 text-gray-200 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-teal-500"
                                        required
                                    />
                                </div>
                                <div>
                                    <label
                                        htmlFor="price"
                                        className="block text-lg text-gray-300 font-medium mb-1"
                                    >
                                        價格：
                                    </label>
                                    <input
                                        type="number"
                                        id="price"
                                        name="price"
                                        value={currentValues.price}
                                        onChange={handleUserInputChange}
                                        className="text-lg w-full p-2 rounded-md bg-gray-700 text-gray-200 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-teal-500"
                                        required
                                    />
                                </div>
                                <div>
                                    <label
                                        htmlFor="url"
                                        className="block text-lg text-gray-300 font-medium mb-1"
                                    >
                                        商品網址：
                                    </label>
                                    <input
                                        type="url"
                                        id="url"
                                        name="url"
                                        value={currentValues.url}
                                        onChange={handleUserInputChange}
                                        className="text-lg w-full p-2 rounded-md bg-gray-700 text-gray-200 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-teal-500"
                                        placeholder="https://www.example.com"
                                    />
                                </div>
                                <div>
                                    <label
                                        htmlFor="threshold"
                                        className="block text-lg text-gray-300 font-medium mb-1"
                                    >
                                        免運門檻（＄）：
                                    </label>
                                    <input
                                        type="number"
                                        id="threshold"
                                        name="threshold"
                                        value={currentValues.threshold}
                                        onChange={handleUserInputChange}
                                        className="text-lg w-full p-2 rounded-md bg-gray-700 text-gray-200 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-teal-500"
                                        required
                                    />
                                </div>
                                <div>
                                    <label
                                        htmlFor="currentTotal"
                                        className="block text-lg text-gray-300 font-medium mb-1"
                                    >
                                        目前累積金額（＄）：
                                    </label>
                                    <input
                                        type="number"
                                        id="currentTotal"
                                        name="currentTotal"
                                        value={currentValues.currentTotal}
                                        onChange={handleUserInputChange}
                                        className="text-lg w-full p-2 rounded-md bg-gray-700 text-gray-200 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-teal-500"
                                        required
                                    />
                                </div>
                                <div>
                                    <label
                                        htmlFor="difference"
                                        className="block text-lg text-gray-300 font-medium mb-1"
                                    >
                                        還差多少金額（＄）：
                                    </label>
                                    <input
                                        type="number"
                                        id="difference"
                                        name="difference"
                                        value={currentValues.difference}
                                        onChange={handleUserInputChange}
                                        className="text-lg w-full p-2 rounded-md bg-gray-700 text-gray-200 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-teal-500"
                                        required
                                    />
                                </div>
                                <div>
                                    <label
                                        htmlFor="closingDate"
                                        className="block text-lg text-gray-300 font-medium mb-1"
                                    >
                                        截止收單日：
                                    </label>
                                    <input
                                        type="datetime-local"
                                        id="closingDate"
                                        name="closingDate"
                                        value={currentValues.closingDate}
                                        onChange={handleUserInputChange}
                                        className="text-lg w-full p-2 rounded-md bg-gray-700 text-gray-200 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-teal-500"
                                        required
                                    />
                                </div>
                                <div>
                                    <label
                                        htmlFor="otherInfo"
                                        className="block text-lg text-gray-300 font-medium mb-1"
                                    >
                                        附加說明：
                                    </label>
                                    <textarea
                                        maxLength={200}
                                        id="otherInfo"
                                        name="otherInfo"
                                        value={currentValues.otherInfo}
                                        onChange={handleUserInputChange}
                                        className="text-lg w-full p-2 rounded-md bg-gray-700 text-gray-200 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-teal-500"
                                        placeholder="最多200字"
                                    />
                                </div>
                                <button
                                    type="submit"
                                    id="user-form-save-btn"
                                    className="w-full bg-teal-600 text-white text-lg py-2 px-4 rounded-md hover:bg-teal-700 hover:font-bold focus:outline-none focus:ring-2 focus:ring-teal-500"
                                >
                                    完成
                                </button>
                            </form>
                        </div>
                    )}
                </>
            )}
        </div>
    );
};

export default UserFormDetail;
