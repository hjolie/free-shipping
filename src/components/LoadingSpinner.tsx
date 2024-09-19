import React from "react";

const LoadingSpinner: React.FC = () => {
    return (
        <div className="fixed inset-4 pt-80 flex flex-col items-center">
            <div className="loader"></div>
            <h1 className="text-xl font-bold text-gray-300 mt-6">
                載入中，請稍候...
            </h1>
        </div>
    );
};

export default LoadingSpinner;
