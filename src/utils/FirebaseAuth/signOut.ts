import { signOut } from "firebase/auth";
import firebaseAuth from "./firebaseAuth";

const firebaseSignOut = async () => {
    return signOut(firebaseAuth);
};

export default firebaseSignOut;
