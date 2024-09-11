import { signOut } from "next-auth/react";

const lineSignOut = async () => {
    return signOut({ redirect: false });
};

export default lineSignOut;
