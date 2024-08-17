"use client";
import { onAuthStateChanged } from "firebase/auth";
import userAuth from "@/utils/userAuth";
import React, { createContext, useContext, useEffect, useState } from "react";

interface AuthContextType {
    email: string | null;
    uid: string | null;
}

const AuthContext = createContext<AuthContextType | null>(null);

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [uid, setUid] = useState<string | null>(null);
    const [email, setEmail] = useState<string | null>(null);

    useEffect(() => {
        // console.log("Running from AuthStateCheck");
        const unsubscribe = onAuthStateChanged(userAuth, (user) => {
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

export const useAuth = (): AuthContextType => {
    const context = useContext(AuthContext);
    if (context === null) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
};

export default AuthProvider;
