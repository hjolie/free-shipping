import { getAuth } from "firebase/auth";
import app from "./firebaseConfig";

const userAuth = getAuth(app);

export default userAuth;
