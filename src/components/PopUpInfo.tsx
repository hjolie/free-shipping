import Image from "next/image";
interface PopUpInfoProps {
    show: boolean;
    onClose: () => void;
}

const PopUpInfo: React.FC<PopUpInfoProps> = ({ show, onClose }) => {
    if (!show) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-gray-800 text-gray-300 p-10 rounded-lg shadow-lg w-11/12 md:w-2/3 lg:w-1/2 relative">
                <button
                    onClick={onClose}
                    className="bg-teal-600 text-white text-lg p-1 rounded-lg hover:bg-teal-700 hover:font-bold focus:outline-none transition duration-300 absolute top-8 right-8"
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="2"
                        stroke="currentColor"
                        className="w-6 h-6"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M6 18L18 6M6 6l12 12"
                        />
                    </svg>
                </button>
                <h2 className="text-2xl font-bold mb-4 text-teal-400">
                    關於 &nbsp;&nbsp;&nbsp;免運GO｜免運購
                </h2>
                <p className="text-lg text-gray-300 mb-4">
                    <br />
                    看到喜歡的商品，揪親友一同湊免運時，總是在Line或Facebook私訊裡來回翻找訊息嗎？免運GO替您省去這樣的麻煩！
                    <br />
                    <br />
                    ·一鍵快速建立您的專屬開團表單
                    <br />
                    ·傳送公開表單連結供親友查看商品資訊與下單
                    <br />
                    ·隨時可在會員後台查看跟團名單、數量與金額
                    <br />
                </p>
                <div className="flex flex-col items-center space-y-8 mt-10 sm:flex-row sm:justify-evenly sm:space-y-2">
                    <div className="flex justify-center sm:order-2">
                        <Image
                            src="/demand.gif"
                            alt=""
                            width={100}
                            height={100}
                            className="sm:w-[100px] sm:h-[100px] md:w-[120px] md:h-[120px] lg:w-[130px] lg:h-[130px] xl:w-[150px] xl:h-[150px] max-w-full h-auto"
                            unoptimized
                        />
                    </div>

                    <p className="text-lg text-gray-300 mb-6 sm:order-1">
                        簡易操作流程：
                        <br /> 1. 註冊並登入
                        <br /> 2. 建立開團表單
                        <br /> 3. 傳送表單連結給親友
                        <br /> 4. 親友完成下單
                        <br /> 5. 到貨時至會員後台查詢跟團記錄
                    </p>
                </div>
                <div className="text-right">
                    <br />
                    <br />
                    <br />(
                    <a href="https://lordicon.com/">Icons by Lordicon.com</a>)
                </div>
            </div>
        </div>
    );
};

export default PopUpInfo;
