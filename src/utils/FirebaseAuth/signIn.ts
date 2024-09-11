import {
    signInWithEmailAndPassword,
    setPersistence,
    browserSessionPersistence,
} from "firebase/auth";
import firebaseAuth from "./firebaseAuth";

const firebaseSignIn = async (email: string, password: string) => {
    await setPersistence(firebaseAuth, browserSessionPersistence);
    return signInWithEmailAndPassword(firebaseAuth, email, password);
};

export default firebaseSignIn;
