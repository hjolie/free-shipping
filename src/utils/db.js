import { getFirestore } from "firebase/firestore/lite";
import app from "./firebaseConfig";

const db = getFirestore(app);

export default db;
