"use client";
import React, { useEffect, useState } from "react";
import LoadingSpinner from "@/components/LoadingSpinner";

const useLoadingSpinner = () => {
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => setLoading(false), 2000);
        return () => clearTimeout(timer);
    }, []);

    const spinnerComponent =
        React.createElement<typeof LoadingSpinner>(LoadingSpinner);

    const spinner = loading ? spinnerComponent : null;

    return { loading, spinner };
};

export default useLoadingSpinner;
