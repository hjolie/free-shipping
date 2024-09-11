import { useRouter } from "next/navigation";
import { toast } from "sonner";
import lineSignOut from "@/utils/Line/lineSignOut";

const LineSignOutBtn = ({
    id,
    closeHamMenu,
}: {
    id?: string;
    closeHamMenu?: () => void;
}) => {
    const router = useRouter();

    const handleLineSignOut = async () => {
        try {
            await lineSignOut();
            toast.success("已登出！");
            router.replace("/");
        } catch (err) {
            console.error("Error signing out: ", err);
        }
    };

    return (
        <button
            onClick={() => {
                handleLineSignOut();
                if (closeHamMenu) closeHamMenu();
            }}
            className="bg-teal-600 text-white text-lg px-3 py-1 rounded-lg shadow-lg hover:bg-teal-700 hover:font-bold transition duration-300"
            id={id}
        >
            登出
        </button>
    );
};

export default LineSignOutBtn;
