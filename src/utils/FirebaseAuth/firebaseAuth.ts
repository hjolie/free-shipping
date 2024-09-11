import { getAuth } from "firebase/auth";
import app from "@/utils/firebaseConfig";

const firebaseAuth = getAuth(app);

export default firebaseAuth;
