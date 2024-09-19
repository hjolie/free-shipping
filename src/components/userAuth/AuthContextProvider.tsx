"use client";
import React, { createContext, useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import firebaseAuth from "@/utils/FirebaseAuth/firebaseAuth";

interface AuthContextType {
    email: string | null;
    uid: string | null;
}

export const AuthContext = createContext<AuthContextType | null>(null);

const AuthContextProvider = ({ children }: { children: React.ReactNode }) => {
    const [uid, setUid] = useState<string | null>(null);
    const [email, setEmail] = useState<string | null>(null);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(firebaseAuth, (user) => {
            if (user) {
                setUid(user.uid);
                setEmail(user.email);
            } else {
                setUid(null);
                setEmail(null);
            }
        });

        return () => unsubscribe();
    }, []);

    return (
        <AuthContext.Provider value={{ uid, email }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthContextProvider;
