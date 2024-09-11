"use client";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useAuth } from "@/components/AuthStateCheck";
import { useSession } from "next-auth/react";
import {
    getDoc,
    doc,
    updateDoc,
    deleteDoc,
    collection,
    query,
    where,
    getDocs,
} from "firebase/firestore/lite";
import db from "@/utils/db";
import { toast } from "sonner";

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

    const { data: session } = useSession();
    const lineUid = session?.user?.id;

    let userId = uid ? uid : lineUid;

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
                            console.error("Can't find the form with id: ", id);
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
        }
    }, [id]);

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

    const handleSaveBtn = async (e: React.FormEvent) => {
        e.preventDefault();

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

            if (Object.keys(updatedFields).length > 0) {
                const docRef = doc(db, "forms", id as string);

                await updateDoc(docRef, updatedFields);

                setOriginalValues(currentValues);
                setIsEditing(false);
                toast.success("團購單更新成功！");
            } else {
                toast.info("內容無修改");
                setIsEditing(false);
            }
        } catch (error) {
            console.error("Error updating the form: ", error);
            toast.error("團購單更新失敗！請再試一次");
            setIsEditing(false);
        }
    };

    const handleCancelBtn = async () => {
        const userConfirmed = await new Promise<boolean>((resolve) => {
            toast.warning("確定要取消編輯嗎？已修改的資料將不會被儲存！", {
                action: {
                    label: "取消編輯",
                    onClick: () => resolve(true),
                },
                cancel: {
                    label: "繼續編輯",
                    onClick: () => resolve(false),
                },
            });
        });

        if (userConfirmed) {
            setCurrentValues(originalValues);
            setIsEditing(false);
        }
    };

    const handleDeleteBtn = async () => {
        const userConfirmed = await new Promise<boolean>((resolve) => {
            toast.warning(
                "確定要刪除此團購單嗎？跟團者名單也將一併被刪除！此刪除動作將無法復原！",
                {
                    action: {
                        label: "確定刪除",
                        onClick: () => resolve(true),
                    },
                    cancel: {
                        label: "取消返回",
                        onClick: () => resolve(false),
                    },
                }
            );
        });

        if (userConfirmed) {
            try {
                await deleteDoc(doc(db, "forms", id as string));

                let buyersDocs: string[] = [];
                const buyersRef = collection(db, "buyers");
                const queryDocs = query(buyersRef, where("formId", "==", id));
                const querySnapshot = await getDocs(queryDocs);
                buyersDocs = querySnapshot.docs.map((doc) => doc.id);
                for (const docId of buyersDocs) {
                    await deleteDoc(doc(db, "buyers", docId));
                }

                toast.success("團購單已刪除！即將返回會員中心");
                setTimeout(() => {
                    router.replace("/user");
                }, 3500);
            } catch (err) {
                console.error(`Error deleting the form - ${id}: `, err);
                toast.error("刪除失敗！");
            }
        }
    };

    const getCurrentDateTime = () => {
        const currentDateTime = new Date();

        currentDateTime.setHours(currentDateTime.getHours() + 1);

        const year = currentDateTime.getFullYear();
        const month = String(currentDateTime.getMonth() + 1).padStart(2, "0");
        const day = String(currentDateTime.getDate()).padStart(2, "0");
        const hours = String(currentDateTime.getHours()).padStart(2, "0");
        const minutes = String(currentDateTime.getMinutes()).padStart(2, "0");

        return `${year}-${month}-${day}T${hours}:${minutes}`;
    };

    if (!uid && !lineUid) {
        return null;
    }

    return (
        <div className="min-h-screen bg-gray-900 text-gray-100 flex flex-col items-center px-4 py-40 space-y-12">
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
                                        目前累積金額/團主份額（＄）：
                                    </h2>
                                    <p className="text-lg w-full p-2 rounded-md bg-gray-700 text-gray-200 border border-gray-600">
                                        {originalValues.currentTotal}
                                    </p>
                                </div>
                                <div>
                                    <h2 className="text-lg text-gray-300 block font-medium mb-1">
                                        免運差額（＄）：
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
                                        {typeof originalValues.closingDate ===
                                        "string"
                                            ? originalValues.closingDate.replace(
                                                  "T",
                                                  "\u00a0\u00a0\u00a0"
                                              ) + " 止"
                                            : originalValues.closingDate}
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
                                        autoFocus
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
                                        min={1}
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
                                        min={1}
                                    />
                                </div>
                                <div>
                                    <label
                                        htmlFor="currentTotal"
                                        className="block text-lg text-gray-300 font-medium mb-1"
                                    >
                                        目前累積金額/團主份額（＄）：
                                    </label>
                                    <input
                                        type="number"
                                        id="currentTotal"
                                        name="currentTotal"
                                        value={currentValues.currentTotal}
                                        onChange={handleUserInputChange}
                                        className="text-lg w-full p-2 rounded-md bg-gray-700 text-gray-200 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-teal-500"
                                        required
                                        min={1}
                                    />
                                </div>
                                <div>
                                    <label
                                        htmlFor="difference"
                                        className="block text-lg text-gray-300 font-medium mb-1"
                                    >
                                        免運差額（＄）：
                                    </label>
                                    <input
                                        type="number"
                                        id="difference"
                                        name="difference"
                                        value={currentValues.difference}
                                        onChange={handleUserInputChange}
                                        className="text-lg w-full p-2 rounded-md bg-gray-700 text-gray-200 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-teal-500"
                                        required
                                        min={1}
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
                                        min={getCurrentDateTime()}
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
                            <button
                                onClick={handleCancelBtn}
                                id="user-form-cancel-btn"
                                className="w-full bg-teal-600 text-white text-lg py-2 px-4 mt-5 rounded-md hover:bg-teal-700 hover:font-bold focus:outline-none focus:ring-2 focus:ring-teal-500"
                            >
                                取消
                            </button>
                        </div>
                    )}
                </>
            )}
        </div>
    );
};

export default UserFormDetail;
