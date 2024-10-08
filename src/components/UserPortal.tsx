"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import useAuthContext from "@/hooks/useAuthContext";
import { useSession } from "next-auth/react";
import db from "@/utils/db";
import { collection, getDocs, query, where } from "firebase/firestore/lite";

interface GroupBuyInfoType {
    formId: string;
    brand: string;
    product: string;
    price: number;
    threshold: number;
    currentTotal: number;
}

const UserPortal: React.FC = () => {
    const [groupBuyForms, setGroupBuyForms] = useState<GroupBuyInfoType[]>([]);
    const [copiedFormId, setCopiedFormId] = useState<string | null>(null);
    const router = useRouter();
    const domainPrefixUrl = "https://free-shipping-go.vercel.app/form/detail/";

    const { uid } = useAuthContext();
    const { data: session } = useSession();
    const lineUid = session?.user?.id;

    let userId = uid ? uid : lineUid;

    useEffect(() => {
        if (!uid && !lineUid) {
            router.replace("/user/auth");
        }
    }, [uid, session]);

    useEffect(() => {
        if (userId) {
            const fetchData = async () => {
                try {
                    const formsRef = collection(db, "forms");
                    const queryDocs = query(
                        formsRef,
                        where("uid", "==", userId)
                    );
                    const querySnapshot = await getDocs(queryDocs);
                    const formsData = querySnapshot.docs.map((doc) => ({
                        formId: doc.id,
                        brand: doc.data().brand,
                        product: doc.data().product,
                        price: doc.data().price,
                        threshold: doc.data().threshold,
                        currentTotal: doc.data().currentTotal,
                    })) as GroupBuyInfoType[];

                    setGroupBuyForms(formsData);
                } catch (err) {
                    console.error("Error fetching group buy forms: ", err);
                }
            };
            fetchData();
        }
    }, [uid, session]);

    useEffect(() => {
        const script = document.createElement("script");
        script.src =
            "https://www.line-website.com/social-plugins/js/thirdparty/loader.min.js";
        script.async = true;
        script.defer = true;

        script.onload = () => {
            if (window.LineIt) {
                window.LineIt.loadButton();
            }
        };

        document.body.appendChild(script);

        return () => {
            document.body.removeChild(script);
        };
    }, []);

    useEffect(() => {
        const loadLineShareButton = () => {
            if (window.LineIt) {
                window.LineIt.loadButton();
            }
        };

        if (groupBuyForms.length > 0) {
            loadLineShareButton();
        }
    }, [groupBuyForms]);

    const handleCopyLink = (formId: string) => {
        navigator.clipboard
            .writeText(domainPrefixUrl + formId)
            .then(() => {
                setCopiedFormId(formId);
                setTimeout(() => setCopiedFormId(null), 3000);
            })
            .catch((err) => {
                console.error("Failed to copy: ", err);
            });
    };

    if (!uid && !lineUid) {
        return null;
    }

    return (
        <div className="min-h-screen bg-gray-900 text-gray-100 px-4 py-40">
            <div className="bg-gray-800 w-full max-w-1100 mx-auto rounded-lg shadow-lg p-8">
                <h1 className="text-2xl font-bold text-teal-400 mb-10 text-center tracking-wider">
                    開團記錄
                </h1>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
                    {groupBuyForms.map((data) => (
                        <div
                            key={data.formId}
                            className="bg-gray-700 border border-gray-200 rounded-lg shadow-lg overflow-hidden"
                        >
                            <Link
                                href={{
                                    pathname: `/user/buyers/${data.formId}`,
                                    query: {
                                        brand: data.brand,
                                        product: data.product,
                                        price: data.price,
                                        threshold: data.threshold,
                                        currentTotal: data.currentTotal,
                                    },
                                }}
                                className="block p-4 transition-transform transform hover:scale-105 hover:bg-teal-700 hover:shadow-2xl"
                            >
                                <p className="text-lg text-center text-gray-300 font-semibold mb-2">
                                    {data.brand}
                                </p>
                                <p className="text-xl text-center text-teal-300 font-bold mb-1 hover:text-teal-400">
                                    {data.product}
                                </p>
                            </Link>
                            <div className="bg-gray-700 border-t border-gray-200 p-1">
                                <p className="text-gray-300 text-center font-bold mb-2">
                                    揪親友湊免運：
                                </p>
                                <div className="flex items-center justify-evenly space-x-2">
                                    <button
                                        onClick={() =>
                                            handleCopyLink(data.formId)
                                        }
                                        className="whitespace-nowrap px-2 py-1 bg-teal-600 text-white rounded hover:bg-teal-700 hover:font-bold focus:outline-none focus:ring-2 focus:ring-teal-500 transition-colors"
                                    >
                                        {copiedFormId === data.formId
                                            ? "已複製！"
                                            : "複製連結"}
                                    </button>
                                    <div
                                        className="line-it-button"
                                        data-lang="zh_Hant"
                                        data-type="share-a"
                                        data-env="REAL"
                                        data-url={domainPrefixUrl + data.formId}
                                        data-color="default"
                                        data-size="large"
                                        data-count="false"
                                        data-ver="3"
                                    ></div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
                    {forms.map((data) => (
                        <div key={data.formId}>
                            <Link
                                href={{
                                    pathname: `/user/buyers/${data.formId}`,
                                    query: {
                                        brand: data.brand,
                                        product: data.product,
                                        price: data.price,
                                        threshold: data.threshold,
                                        currentTotal: data.currentTotal,
                                    },
                                }}
                                className="block bg-gray-700 border border-gray-200 rounded-lg shadow-lg p-4 transition-transform transform hover:scale-105 hover:bg-teal-700 hover:shadow-2xl"
                            >
                                <p className="text-lg text-center text-gray-300 font-semibold mb-2">
                                    {data.brand}
                                </p>
                                <p className="text-xl text-center text-teal-300 font-bold mb-1 hover:font-extrabold">
                                    {data.product}
                                </p>
                            </Link>
                            <div className="block bg-gray-700 border border-gray-200 rounded-lg shadow-lg rounded-lg shadow-md p-2">
                                <p className="text-gray-300 text-center">
                                    分享給親友：
                                </p>
                                <div className="flex justify-between">
                                    <button
                                        onClick={() =>
                                            handleCopyLink(data.formId)
                                        }
                                        className="whitespace-nowrap ml-auto px-3 py-1 bg-teal-600 text-white rounded hover:bg-teal-700 hover:font-bold focus:outline-none focus:ring-2 focus:ring-teal-500 transition-colors"
                                    >
                                        {copiedFormId === data.formId
                                            ? "已複製！"
                                            : "複製連結"}
                                    </button>
                                    <div
                                        className="line-it-button"
                                        data-lang="zh_Hant"
                                        data-type="share-a"
                                        data-env="REAL"
                                        data-url="https://developers.line.biz/zh-hant/docs/line-social-plugins/install-guide/using-line-share-buttons/"
                                        data-color="default"
                                        data-size="large"
                                        data-count="false"
                                        data-ver="3"
                                    ></div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div> */}
            </div>
        </div>
    );
};

export default UserPortal;
