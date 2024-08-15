"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useAuth } from "@/components/AuthStateCheck";
import db from "@/utils/db";
import { collection, getDocs, query, where } from "firebase/firestore/lite";

interface GroupBuyInfoType {
    formId: string;
    brand: string;
    product: string;
}

// const forms: GroupBuyInfoType[] = [
//     { formId: "1", brand: "Brand A", product: "Order A" },
//     { formId: "2", brand: "Brand B", product: "Order B" },
//     { formId: "3", brand: "Brand C", product: "Order C" },
//     { formId: "4", brand: "Brand D", product: "Order D" },
//     { formId: "5", brand: "Brand E", product: "Order E" },
// ];

const UserPortal: React.FC = () => {
    const { uid } = useAuth();
    const [groupBuyForms, setGroupBuyForms] = useState<GroupBuyInfoType[]>([]);
    const router = useRouter();

    useEffect(() => {
        console.log("UID from UserPortal: ", uid);
        if (!uid) {
            router.replace("/user/auth");
        }
    }, [uid]);

    if (!uid) {
        return null;
    }

    useEffect(() => {
        if (uid) {
            const fetchData = async () => {
                try {
                    const formsRef = collection(db, "forms");
                    const queryDocs = query(formsRef, where("uid", "==", uid));
                    const querySnapshot = await getDocs(queryDocs);
                    const formsData = querySnapshot.docs.map((doc) => ({
                        formId: doc.id,
                        brand: doc.data().brand,
                        product: doc.data().product,
                    })) as GroupBuyInfoType[];

                    setGroupBuyForms(formsData);
                } catch (err) {
                    console.error("Error fetching group buy forms: ", err);
                }
            };
            fetchData();
        }
    }, [uid]);

    return (
        <div className="min-h-screen bg-gray-900 text-gray-100 p-4 mt-36 mb-12">
            <div className="bg-gray-800 w-full max-w-1100 mx-auto rounded-lg shadow-lg p-8">
                <h1 className="text-2xl font-bold text-teal-400 mb-10 text-center tracking-wider">
                    開團記錄
                </h1>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {groupBuyForms.map((data) => (
                        <Link
                            key={data.formId}
                            href={`/user/detail/${data.formId}`}
                            className="block bg-gray-700 border border-gray-200 rounded-lg shadow-lg p-4 transition-transform transform hover:scale-105 hover:bg-teal-700 hover:shadow-2xl"
                        >
                            <p className="text-lg text-gray-300 font-semibold mb-2">
                                {data.brand}
                            </p>
                            <p className="text-xl text-teal-300 font-bold mb-1 hover:font-extrabold">
                                {data.product}
                            </p>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default UserPortal;
