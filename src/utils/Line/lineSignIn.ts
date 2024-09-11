import { signIn } from "next-auth/react";

const lineSignIn = async () => {
    return signIn("line", { redirect: false });
};

export default lineSignIn;
