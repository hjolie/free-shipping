import {
    createUserWithEmailAndPassword,
    setPersistence,
    inMemoryPersistence,
} from "firebase/auth";
import firebaseAuth from "./firebaseAuth";

const firebaseSignUp = async (email: string, password: string) => {
    await setPersistence(firebaseAuth, inMemoryPersistence);
    return createUserWithEmailAndPassword(firebaseAuth, email, password);
};

export default firebaseSignUp;
