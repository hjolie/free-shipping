"use client";
import React from "react";
import { useState, useEffect } from "react";

// Define the type for the form data
type FormData = {
    field1?: string;
    field2?: string;
    field3?: string;
    field4?: string;
    field5?: string;
    field6?: string;
    field7?: string;
};

// Mock data for testing
const testData: FormData = {
    field1: "Sample Data 1",
    field2: "Sample Data 2",
    field3: "Sample Data 3",
    field4: "Sample Data 4",
    field5: "Sample Data 5",
    field6: "Sample Data 6",
    field7: "Sample Data 7",
};

const DisplayPage: React.FC<{ formData: FormData }> = ({ formData }) => {
    const [loading, setLoading] = useState(true);
    // Fallback values if formData is undefined
    const {
        field1 = "No data",
        field2 = "No data",
        field3 = "No data",
        field4 = "No data",
        field5 = "No data",
        field6 = "No data",
        field7 = "No data",
    } = formData || {};

    useEffect(() => {
        // Loading Animation
        const timer = setTimeout(() => setLoading(false), 2000);
        return () => clearTimeout(timer);
    }, []);

    return (
        <div className="min-h-screen bg-gray-900 text-gray-100 flex items-center justify-center p-4">
            {loading ? (
                <div className="flex flex-col items-center">
                    <div className="loader"></div>
                    <h1 className="text-xl font-bold text-gray-300 mt-6">
                        建單中，請稍候...
                    </h1>
                </div>
            ) : (
                <div className="w-full max-w-2xl bg-gray-800 rounded-lg shadow-lg p-8">
                    <h1 className="text-2xl font-semibold mb-6">
                        Submitted Information
                    </h1>
                    <div className="space-y-4">
                        <div className="bg-gray-700 p-4 rounded-md">
                            <h2 className="text-lg font-semibold mb-2">
                                Field 1
                            </h2>
                            <p className="text-gray-300">{field1}</p>
                        </div>
                        <div className="bg-gray-700 p-4 rounded-md">
                            <h2 className="text-lg font-semibold mb-2">
                                Field 2
                            </h2>
                            <p className="text-gray-300">{field2}</p>
                        </div>
                        <div className="bg-gray-700 p-4 rounded-md">
                            <h2 className="text-lg font-semibold mb-2">
                                Field 3
                            </h2>
                            <p className="text-gray-300">{field3}</p>
                        </div>
                        <div className="bg-gray-700 p-4 rounded-md">
                            <h2 className="text-lg font-semibold mb-2">
                                Field 4
                            </h2>
                            <p className="text-gray-300">{field4}</p>
                        </div>
                        <div className="bg-gray-700 p-4 rounded-md">
                            <h2 className="text-lg font-semibold mb-2">
                                Field 5
                            </h2>
                            <p className="text-gray-300">{field5}</p>
                        </div>
                        <div className="bg-gray-700 p-4 rounded-md">
                            <h2 className="text-lg font-semibold mb-2">
                                Field 6
                            </h2>
                            <p className="text-gray-300">{field6}</p>
                        </div>
                        <div className="bg-gray-700 p-4 rounded-md">
                            <h2 className="text-lg font-semibold mb-2">
                                Field 7
                            </h2>
                            <p className="text-gray-300">{field7}</p>
                        </div>
                    </div>
                    <button
                        className="mt-6 w-full bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700 transition-colors"
                        onClick={() =>
                            alert("Edit functionality not implemented yet")
                        }
                    >
                        Edit Information
                    </button>
                </div>
            )}
        </div>
    );
};

// Component usage with testing data
const TestPage: React.FC = () => {
    return <DisplayPage formData={testData} />;
};

export default TestPage;
