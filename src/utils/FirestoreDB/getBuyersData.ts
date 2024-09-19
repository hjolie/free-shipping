import { collection, getDocs, query, where } from "firebase/firestore/lite";
import db from "@/utils/db";
import BuyersDataType from "@/types/buyersDataType";

const getBuyersData = async (formId: string) => {
    const buyersRef = collection(db, "buyers");
    const queryDocs = query(buyersRef, where("formId", "==", formId));
    const querySnapshot = await getDocs(queryDocs);
    const buyersData = querySnapshot.docs.map((doc) => ({
        name: doc.data().name,
        quantity: doc.data().quantity,
        note: doc.data().note,
    })) as BuyersDataType[];

    return buyersData;
};

export default getBuyersData;
