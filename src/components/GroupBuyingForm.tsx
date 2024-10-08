"use client";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import useAuthContext from "@/hooks/useAuthContext";
import { useSession } from "next-auth/react";
import { CreateFormType } from "@/types/formTypes";
import createForm from "@/utils/FirestoreDB/createForm";
import getCurrentDateTime from "@/utils/SharedFuncs/getCurrentDateTime";
import { toast } from "sonner";

const initialFormData: CreateFormType = {
    brand: "",
    product: "",
    price: 0,
    url: "",
    threshold: 0,
    currentTotal: 0,
    difference: 0,
    closingDate: "",
    otherInfo: "",
};

const GroupBuyingForm: React.FC = () => {
    const [formData, setFormData] = useState<CreateFormType>(initialFormData);
    const router = useRouter();

    const { uid } = useAuthContext();

    const { data: session } = useSession();
    const lineUid = session?.user?.id;

    let userId = uid ? uid : lineUid;

    useEffect(() => {
        if (!uid && !lineUid) {
            router.replace("/user/auth");
        }
    }, [uid, session]);

    const handleFormSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (userId) {
            const docId = await createForm(formData, userId);

            if (docId) {
                toast.success(
                    "團購單建立成功！即將導向團購單公開連結，可立即傳送給親友下單！",
                    {
                        duration: 5000,
                    }
                );
                setFormData(initialFormData);
                setTimeout(() => {
                    router.replace(`/form/detail/${docId}`);
                }, 5500);
            } else {
                console.error("Failed to retrieve the docId");
                toast.error(
                    "無法取得團購單公開連結，請另至「會員中心」取得該連結",
                    {
                        duration: 5000,
                    }
                );
            }
        } else {
            console.error("User ID is undefined");
        }
    };

    const handleInputChange = (
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

        setFormData((prevFormData) => ({
            ...prevFormData,
            [name]: newValue,
        }));
    };

    if (!uid && !lineUid) {
        return null;
    }

    return (
        <div className="min-h-screen bg-gray-900 text-gray-100 flex items-center justify-center px-4 py-40">
            <div className="w-full max-w-lg bg-gray-800 rounded-lg shadow-lg p-8">
                <h1 className="text-2xl font-bold text-teal-400 mb-10 text-center tracking-wide">
                    建立親友團購單
                </h1>
                <form className="space-y-6" onSubmit={handleFormSubmit}>
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
                            value={formData.brand}
                            onChange={handleInputChange}
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
                            value={formData.product}
                            onChange={handleInputChange}
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
                            value={formData.price}
                            onChange={handleInputChange}
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
                            value={formData.url}
                            onChange={handleInputChange}
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
                            value={formData.threshold}
                            onChange={handleInputChange}
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
                            value={formData.currentTotal}
                            onChange={handleInputChange}
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
                            value={formData.difference}
                            onChange={handleInputChange}
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
                            value={formData.closingDate}
                            onChange={handleInputChange}
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
                            value={formData.otherInfo}
                            onChange={handleInputChange}
                            className="text-lg w-full p-2 rounded-md bg-gray-700 text-gray-200 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-teal-500"
                            placeholder="最多200字"
                        />
                    </div>
                    <button
                        type="submit"
                        id="group-buy-submit-btn"
                        className="w-full bg-teal-600 text-white text-lg py-2 px-4 rounded-md hover:bg-teal-700 hover:font-bold focus:outline-none focus:ring-2 focus:ring-teal-500"
                    >
                        建立團購單
                    </button>
                </form>
            </div>
        </div>
    );
};

export default GroupBuyingForm;
