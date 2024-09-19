import { collection, addDoc } from "firebase/firestore/lite";
import db from "@/utils/db";
import { CreateFormType } from "@/types/formTypes";

const createForm = async (
    newFormData: CreateFormType,
    userId: string
): Promise<string | null> => {
    try {
        const newDoc = await addDoc(collection(db, "forms"), {
            ...newFormData,
            uid: userId,
        });

        return newDoc.id;
    } catch (err) {
        console.error("Error adding new form to DB: ", err);
        return null;
    }
};

export default createForm;
