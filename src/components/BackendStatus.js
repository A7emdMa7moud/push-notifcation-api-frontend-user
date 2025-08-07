"use client";

import { useState, useEffect } from "react";
import { CheckCircle, XCircle, AlertTriangle } from "lucide-react";

export const BackendStatus = () => {
  const [backendStatus, setBackendStatus] = useState("checking");
  const [lastCheck, setLastCheck] = useState(null);

  const checkBackendStatus = async () => {
    try {
      const response = await fetch(
        `${
          process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api"
        }/health`,
        {
          method: "GET",
          timeout: 3000,
        }
      );

      if (response.ok) {
        setBackendStatus("connected");
      } else {
        setBackendStatus("error");
      }
    } catch (error) {
      setBackendStatus("disconnected");
    }

    setLastCheck(new Date());
  };

  useEffect(() => {
    checkBackendStatus();

    // فحص كل 30 ثانية
    const interval = setInterval(checkBackendStatus, 10000);

    return () => clearInterval(interval);
  }, []);

  const getStatusIcon = () => {
    switch (backendStatus) {
      case "connected":
        return <CheckCircle className="w-4 h-4 text-green-500" />;
      case "disconnected":
        return <XCircle className="w-4 h-4 text-red-500" />;
      case "error":
        return <AlertTriangle className="w-4 h-4 text-yellow-500" />;
      default:
        return (
          <div className="w-4 h-4 border-2 border-gray-300 border-t-blue-500 rounded-full animate-spin"></div>
        );
    }
  };

  const getStatusText = () => {
    switch (backendStatus) {
      case "connected":
        return "متصل";
      case "disconnected":
        return "غير متصل";
      case "error":
        return "خطأ في الاتصال";
      default:
        return "جاري الفحص...";
    }
  };

  const getStatusColor = () => {
    switch (backendStatus) {
      case "connected":
        return "bg-green-100 text-green-700";
      case "disconnected":
        return "bg-red-100 text-red-700";
      case "error":
        return "bg-yellow-100 text-yellow-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  return (
    <div className="flex items-center justify-between">
      <span className="text-sm text-gray-600">حالة Backend:</span>
      <div className="flex items-center gap-2">
        {getStatusIcon()}
        <span className={`text-xs px-2 py-1 rounded ${getStatusColor()}`}>
          {getStatusText()}
        </span>
      </div>
    </div>
  );
};
