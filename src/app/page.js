"use client";

import { useState, useEffect } from "react";
import useNotifications from "../hooks/useNotifications";
import Navigation from "../components/Navigation";
import {
  Bell,
  BellOff,
  Settings,
  CheckCircle,
  XCircle,
  AlertTriangle,
  Copy,
  Check,
} from "lucide-react";
import { BackendStatus } from "../components/BackendStatus";
import toast from "react-hot-toast";
import PWAInstallPrompt from "../components/PWAInstallPrompt";

export default function Home() {
  const [copied, setCopied] = useState(false);
  const {
    fcmToken,
    isSupported,
    permission,
    isLoading,
    requestPermission,
    getFCMToken,
    deleteFCMToken,
    initializeNotifications,
  } = useNotifications();

  const handleEnableNotifications = async () => {
    await initializeNotifications();
  };

  const handleDisableNotifications = async () => {
    await deleteFCMToken();
  };

  const handleCopyToken = async () => {
    if (fcmToken) {
      try {
        await navigator.clipboard.writeText(fcmToken);
        setCopied(true);
        toast.success("تم نسخ FCM Token");
        setTimeout(() => setCopied(false), 2000);
      } catch (error) {
        console.error("Error copying token:", error);
        toast.error("فشل في نسخ Token");
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <Navigation />
      <div className="max-w-md mx-auto bg-white rounded-xl shadow-lg p-6 mt-10 mx-4">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Bell className="w-8 h-8 text-blue-600" />
          </div>
          <h1 className="text-2xl font-bold text-gray-800 mb-2">
            إشعارات التطبيق
          </h1>
          <p className="text-gray-600">
            احصل على آخر التحديثات والإشعارات المهمة
          </p>
        </div>

        {/* حالة الإشعارات */}
        <div className="bg-gray-50 rounded-lg p-4 mb-6">
          <h3 className="font-semibold text-gray-700 mb-3">حالة الإشعارات</h3>

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">دعم المتصفح:</span>
              {isSupported ? (
                <CheckCircle className="w-4 h-4 text-green-500" />
              ) : (
                <XCircle className="w-4 h-4 text-red-500" />
              )}
            </div>

            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">إذن الإشعارات:</span>
              <span
                className={`text-xs px-2 py-1 rounded ${
                  permission === "granted"
                    ? "bg-green-100 text-green-700"
                    : permission === "denied"
                    ? "bg-red-100 text-red-700"
                    : "bg-yellow-100 text-yellow-700"
                }`}
              >
                {permission === "granted"
                  ? "مُفعل"
                  : permission === "denied"
                  ? "مرفوض"
                  : "في الانتظار"}
              </span>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">FCM Token:</span>
              {fcmToken ? (
                <CheckCircle className="w-4 h-4 text-green-500" />
              ) : (
                <XCircle className="w-4 h-4 text-red-500" />
              )}
            </div>

            {/* حالة Backend */}
            <BackendStatus />
          </div>
        </div>

        {/* عرض FCM Token */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
          <h3 className="font-semibold text-blue-800 mb-3 flex items-center gap-2">
            <Settings className="w-4 h-4" />
            FCM Token
          </h3>
          {fcmToken ? (
            <>
              <div className="bg-white border border-blue-300 rounded-lg p-3 mb-3">
                <p className="text-xs text-gray-600 mb-2 font-medium">
                  Token الحالي:
                </p>
                <div className="flex items-start gap-2">
                  <code className="text-xs text-blue-700 bg-blue-100 px-2 py-1 rounded flex-1 break-all">
                    {fcmToken}
                  </code>
                  <button
                    onClick={handleCopyToken}
                    className="flex-shrink-0 bg-blue-600 hover:bg-blue-700 text-white p-2 rounded-lg transition-colors"
                    title="نسخ Token"
                  >
                    {copied ? (
                      <Check className="w-4 h-4" />
                    ) : (
                      <Copy className="w-4 h-4" />
                    )}
                  </button>
                </div>
              </div>
              <p className="text-xs text-blue-600">
                هذا Token يستخدم لتحديد الجهاز وإرسال الإشعارات إليه
              </p>
            </>
          ) : (
            <div className="bg-yellow-50 border border-yellow-300 rounded-lg p-3">
              <p className="text-sm text-yellow-700">
                {permission === 'granted'
                  ? "جاري الحصول على Token..."
                  : "قم بطلب إذن الإشعارات أولاً للحصول على FCM Token"}
              </p>
            </div>
          )}
        </div>

        {/* أزرار التحكم */}
        <div className="space-y-3">
          {permission === 'default' && (
            <button
              onClick={requestPermission}
              disabled={isLoading}
              className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 disabled:cursor-not-allowed text-white font-medium py-3 px-4 rounded-lg flex items-center justify-center gap-2 transition-colors"
            >
              {isLoading ? (
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              ) : (
                <Bell className="w-4 h-4" />
              )}
              {isLoading ? "جاري طلب الإذن..." : "طلب إذن الإشعارات"}
            </button>
          )}
          
          {permission === 'granted' && !fcmToken && (
            <button
              onClick={getFCMToken}
              disabled={isLoading}
              className="w-full bg-green-600 hover:bg-green-700 disabled:bg-green-400 disabled:cursor-not-allowed text-white font-medium py-3 px-4 rounded-lg flex items-center justify-center gap-2 transition-colors"
            >
              {isLoading ? (
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              ) : (
                <Bell className="w-4 h-4" />
              )}
              {isLoading ? "جاري الحصول على التوكن..." : "الحصول على FCM Token"}
            </button>
          )}
          
          {fcmToken && (
            <button
              onClick={handleDisableNotifications}
              className="w-full bg-red-600 hover:bg-red-700 text-white font-medium py-3 px-4 rounded-lg flex items-center justify-center gap-2 transition-colors"
            >
              <BellOff className="w-4 h-4" />
              إلغاء تفعيل الإشعارات
            </button>
          )}
        </div>

        {/* معلومات إضافية */}
        <div className="mt-6 text-center">
          <p className="text-xs text-gray-500">
            ستستمر في تلقي الإشعارات حتى عندما يكون التطبيق مغلق
          </p>
          <p className="text-xs text-gray-400 mt-1">
            Backend غير مطلوب للاختبار المحلي
          </p>
        </div>

        {/* رابط صفحة الإشعارات */}
        <div className="mt-6 pt-6 border-t border-gray-200">
          <a
            href="/notifications"
            className="inline-flex items-center justify-center w-full bg-green-600 hover:bg-green-700 text-white font-medium py-3 px-4 rounded-lg transition-colors"
          >
            <Bell className="w-4 h-4 mr-2" />
            إدارة الإشعارات
          </a>
          <p className="text-xs text-gray-500 mt-2">
            إرسال وإدارة الإشعارات مع الباك اند
          </p>
        </div>
      </div>
      <PWAInstallPrompt />
    </div>
  );
}
