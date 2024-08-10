import Detail from "@/components/Detail";

const DetailPage = () => {
    return <Detail />;
};

export default DetailPage;

// "use client";
// import React from "react";
// import { useState, useEffect } from "react";

// // Define the type for the form data
// type FormData = {
//     field1?: string;
//     field2?: string;
//     field3?: string;
//     field4?: string;
//     field5?: string;
//     field6?: string;
//     field7?: string;
// };

// // Mock data for testing
// const testData: FormData = {
//     field1: "Sample Data 1",
//     field2: "Sample Data 2",
//     field3: "Sample Data 3",
//     field4: "Sample Data 4",
//     field5: "Sample Data 5",
//     field6: "Sample Data 6",
//     field7: "Sample Data 7",
// };

// const DisplayPage: React.FC<{ formData: FormData }> = ({ formData }) => {
//     const [loading, setLoading] = useState(true);
//     // Fallback values if formData is undefined
//     const {
//         field1 = "No data",
//         field2 = "No data",
//         field3 = "No data",
//         field4 = "No data",
//         field5 = "No data",
//         field6 = "No data",
//         field7 = "No data",
//     } = formData || {};

//     useEffect(() => {
//         // Loading Animation
//         const timer = setTimeout(() => setLoading(false), 1000);
//         return () => clearTimeout(timer);
//     }, []);

//     return (
//         <div className="min-h-screen bg-gray-900 text-gray-100 flex items-center justify-center p-4 mt-36 mb-12">
//             {loading ? (
//                 <div className="flex flex-col items-center">
//                     <div className="loader"></div>
//                     <h1 className="text-xl font-bold text-gray-300 mt-6">
//                         建單中，請稍候...
//                     </h1>
//                 </div>
//             ) : (
//                 <div className="w-full max-w-2xl bg-gray-800 rounded-lg shadow-lg p-8">
//                     <h1 className="text-2xl font-bold text-teal-400 mb-10 text-center">
//                         團購單
//                     </h1>

//                     <div className="space-y-6">
//                         <div>
//                             <h2 className="text-lg text-gray-300 block font-medium mb-1">
//                                 品牌/商家名稱：
//                             </h2>
//                             <p className="text-lg w-full p-2 rounded-md bg-gray-700 text-gray-200 border border-gray-600">
//                                 {field1}
//                             </p>
//                         </div>
//                         <div>
//                             <h2 className="text-lg text-gray-300 block font-medium mb-1">
//                                 商品：
//                             </h2>
//                             <p className="text-lg w-full p-2 rounded-md bg-gray-700 text-gray-200 border border-gray-600">
//                                 {field1}
//                             </p>
//                         </div>
//                         <div>
//                             <h2 className="text-lg text-gray-300 block font-medium mb-1">
//                                 價格：
//                             </h2>
//                             <p className="text-lg w-full p-2 rounded-md bg-gray-700 text-gray-200 border border-gray-600">
//                                 {field1}
//                             </p>
//                         </div>
//                         <div>
//                             <h2 className="text-lg text-gray-300 block font-medium mb-1">
//                                 商品網址：
//                             </h2>
//                             <p className="text-lg w-full p-2 rounded-md bg-gray-700 text-gray-200 border border-gray-600">
//                                 {field1}
//                             </p>
//                         </div>
//                         <div>
//                             <h2 className="text-lg text-gray-300 block font-medium mb-1">
//                                 免運門檻（＄）：
//                             </h2>
//                             <p className="text-lg w-full p-2 rounded-md bg-gray-700 text-gray-200 border border-gray-600">
//                                 {field1}
//                             </p>
//                         </div>
//                         <div>
//                             <h2 className="text-lg text-gray-300 block font-medium mb-1">
//                                 目前累積金額（＄）：
//                             </h2>
//                             <p className="text-lg w-full p-2 rounded-md bg-gray-700 text-gray-200 border border-gray-600">
//                                 {field1}
//                             </p>
//                         </div>
//                         <div>
//                             <h2 className="text-lg text-gray-300 block font-medium mb-1">
//                                 還差多少金額（＄）：
//                             </h2>
//                             <p className="text-lg w-full p-2 rounded-md bg-gray-700 text-gray-200 border border-gray-600">
//                                 {field1}
//                             </p>
//                         </div>
//                         <div>
//                             <h2 className="text-lg text-gray-300 block font-medium mb-1">
//                                 截止收單日：
//                             </h2>
//                             <p className="text-lg w-full p-2 rounded-md bg-gray-700 text-gray-200 border border-gray-600">
//                                 {field1}
//                             </p>
//                         </div>
//                         <div>
//                             <h2 className="text-lg text-gray-300 block font-medium mb-1">
//                                 附加說明：
//                             </h2>
//                             <p className="text-lg w-full p-2 rounded-md bg-gray-700 text-gray-200 border border-gray-600">
//                                 {field1}
//                             </p>
//                         </div>
//                     </div>
//                     <button
//                         id="group-buy-edit-btn"
//                         className="w-full bg-teal-600 text-white text-lg py-2 px-4 rounded-md hover:bg-teal-700 hover:font-bold focus:outline-none focus:ring-2 focus:ring-teal-500"
//                         onClick={() =>
//                             alert("Edit functionality not implemented yet")
//                         }
//                     >
//                         Edit
//                     </button>
//                 </div>
//             )}
//         </div>
//     );
// };

// // Component usage with testing data
// const TestPage: React.FC = () => {
//     return <DisplayPage formData={testData} />;
// };

// export default TestPage;

// {
//     /* <div className="bg-gray-700 p-4 rounded-md">
//                             <h2 className="text-lg font-semibold mb-2">
//                                 Field 2
//                             </h2>
//                             <p className="text-gray-300">{field2}</p>
//                         </div> */
// }
