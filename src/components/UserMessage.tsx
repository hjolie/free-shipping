import Link from "next/link";

type UserMessageProps = {
    message: string;
};

const UserMessage: React.FC<UserMessageProps> = ({ message }) => {
    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white px-4">
            <div className="bg-gray-800 p-8 pb-5 rounded-lg shadow-lg w-full max-w-md sm:max-w-lg lg:max-w-xl">
                <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-center text-gray-300 mb-10">
                    {message}
                </h1>
                <div className="flex justify-center mb-2">
                    <Link
                        href="/"
                        className="bg-teal-600 text-white text-lg px-4 py-2 rounded-lg shadow-lg hover:bg-teal-700 hover:font-bold transition duration-300"
                    >
                        回首頁
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default UserMessage;
