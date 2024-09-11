import firebaseSignOut from "@/utils/FirebaseAuth/signOut";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

const SignOutBtn = ({
    id,
    closeHamMenu,
}: {
    id?: string;
    closeHamMenu?: () => void;
}) => {
    const router = useRouter();

    const handleSignOut = async () => {
        try {
            await firebaseSignOut();
            toast.success("已登出！");
            router.replace("/");
        } catch (err) {
            console.error("Error signing out: ", err);
        }
    };

    return (
        <button
            onClick={() => {
                handleSignOut();
                if (closeHamMenu) closeHamMenu();
            }}
            className="bg-teal-600 text-white text-lg px-3 py-1 rounded-lg shadow-lg hover:bg-teal-700 hover:font-bold transition duration-300"
            id={id}
        >
            登出
        </button>
    );
};

export default SignOutBtn;
