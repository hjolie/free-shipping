const GroupBuyForm = () => {
    return (
        <div className="min-h-screen bg-gray-900 text-gray-100 flex items-center justify-center p-4 mt-36 mb-12">
            <div className="w-full max-w-lg bg-gray-800 rounded-lg shadow-lg p-8">
                <h1 className="text-2xl font-bold text-teal-400 mb-10 text-center">
                    建立親友團購單
                </h1>
                <form className="space-y-6">
                    <div>
                        <label
                            htmlFor="field1"
                            className="text-lg text-gray-300 block font-medium mb-1"
                        >
                            品牌/商家名稱：
                        </label>
                        <input
                            type="text"
                            id="field1"
                            name="field1"
                            className="text-lg w-full p-2 rounded-md bg-gray-700 text-gray-200 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-teal-500"
                            required
                        />
                    </div>
                    <div>
                        <label
                            htmlFor="field2"
                            className="block text-lg text-gray-300 font-medium mb-1"
                        >
                            商品：
                        </label>
                        <input
                            type="text"
                            id="field2"
                            name="field2"
                            className="text-lg w-full p-2 rounded-md bg-gray-700 text-gray-200 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-teal-500"
                            required
                        />
                    </div>
                    <div>
                        <label
                            htmlFor="field3"
                            className="block text-lg text-gray-300 font-medium mb-1"
                        >
                            價格：
                        </label>
                        <input
                            type="number"
                            id="field3"
                            name="field3"
                            className="text-lg w-full p-2 rounded-md bg-gray-700 text-gray-200 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-teal-500"
                            required
                        />
                    </div>
                    <div>
                        <label
                            htmlFor="field4"
                            className="block text-lg text-gray-300 font-medium mb-1"
                        >
                            免運門檻（＄）：
                        </label>
                        <input
                            type="number"
                            id="field4"
                            name="field4"
                            className="text-lg w-full p-2 rounded-md bg-gray-700 text-gray-200 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-teal-500"
                            required
                        />
                    </div>
                    <div>
                        <label
                            htmlFor="field5"
                            className="block text-lg text-gray-300 font-medium mb-1"
                        >
                            目前湊團金額（＄）：
                        </label>
                        <input
                            type="number"
                            id="field5"
                            name="field5"
                            className="text-lg w-full p-2 rounded-md bg-gray-700 text-gray-200 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-teal-500"
                            required
                        />
                    </div>
                    <div>
                        <label
                            htmlFor="field6"
                            className="block text-lg text-gray-300 font-medium mb-1"
                        >
                            還差多少免運？（＄）：
                        </label>
                        <input
                            type="number"
                            id="field6"
                            name="field6"
                            className="text-lg w-full p-2 rounded-md bg-gray-700 text-gray-200 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-teal-500"
                            required
                        />
                    </div>
                    <div>
                        <label
                            htmlFor="field7"
                            className="block text-lg text-gray-300 font-medium mb-1"
                        >
                            商品網址：
                        </label>
                        <input
                            type="url"
                            id="field7"
                            name="field7"
                            className="text-lg w-full p-2 rounded-md bg-gray-700 text-gray-200 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-teal-500"
                            required
                        />
                    </div>
                    <div>
                        <label
                            htmlFor="field7"
                            className="block text-lg text-gray-300 font-medium mb-1"
                        >
                            截止收單日期：
                        </label>
                        <input
                            type="date"
                            id="field7"
                            name="field7"
                            className="text-lg w-full p-2 rounded-md bg-gray-700 text-gray-200 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-teal-500"
                            required
                        />
                    </div>
                    <button
                        type="submit"
                        id="group-buy-submit-btn"
                        className="w-full bg-teal-600 text-white text-lg py-2 px-4 rounded-md hover:bg-teal-700 hover:font-bold focus:outline-none focus:ring-2 focus:ring-teal-500"
                    >
                        建立團購單
                    </button>
                </form>
            </div>
        </div>
    );
};

export default GroupBuyForm;
