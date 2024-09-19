import { AuthContext } from "@/components/userAuth/AuthContextProvider";
import { useContext } from "react";

const useAuthContext = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error(
            "useAuthContext must be used within the AuthContextProvider"
        );
    }
    return context;
};

export default useAuthContext;
