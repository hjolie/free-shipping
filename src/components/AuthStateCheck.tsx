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

// const AuthStateCheck: React.FC<{ children: React.ReactNode }> = ({
//     children,
// }) => {
//     const [authenticated, setAuthenticated] = useState(false);
//     const [loading, setLoading] = useState(true);
//     const [email, setEmail] = useState<string | null>(null);
//     const [uid, setUid] = useState<string | null>(null);

//     const router = useRouter();

//     useEffect(() => {
//         const unsubscribe = onAuthStateChanged(userAuth, async (user) => {
//             if (user) {
//                 setAuthenticated(true);
//                 setEmail(user.email);
//                 setUid(user.uid);
//             } else {
//                 setAuthenticated(false);
//                 router.replace("/");
//             }
//             setLoading(false);
//         });
//         return () => unsubscribe();
//     }, []);

//     if (!authenticated) {
//         return null;
//     }

//     if (loading) {
//         return <h3>Loading...</h3>;
//     }

//     return <>{children}</>;
// };

// export default AuthStateCheck;
