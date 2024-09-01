import { signOut } from "next-auth/react";
import { toast } from "sonner";

const LineSignOut = ({ id }: { id?: string }) => {
    const handleLineSignOut = async () => {
        try {
            await signOut({ callbackUrl: "/" });
            toast.success("已登出！");
        } catch (err) {
            console.error("Error signing out: ", err);
        }
    };

    return (
        <button
            onClick={handleLineSignOut}
            className="bg-teal-600 text-white text-lg px-3 py-1 rounded-lg shadow-lg hover:bg-teal-700 hover:font-bold transition duration-300"
            id={id}
        >
            登出
        </button>
    );
};

export default LineSignOut;
