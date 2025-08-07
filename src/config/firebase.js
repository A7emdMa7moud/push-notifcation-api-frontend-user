// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {
  getAnalytics,
  isSupported as isAnalyticsSupported,
} from "firebase/analytics";
import { getMessaging, isSupported } from "firebase/messaging";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyChecrqkWDyGweGw1nCX7iOcrWHzmAW0oQ",
  authDomain: "push-notification-db7f4.firebaseapp.com",
  projectId: "push-notification-db7f4",
  storageBucket: "push-notification-db7f4.firebasestorage.app",
  messagingSenderId: "159657696935",
  appId: "1:159657696935:web:f21ed6a2c6338eb0d68582",
  measurementId: "G-GC7KLFJQ5Y",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Analytics only on client side
let analytics = null;
if (typeof window !== "undefined") {
  isAnalyticsSupported().then((supported) => {
    if (supported) {
      analytics = getAnalytics(app);
    }
  });
}

// Initialize Firebase Cloud Messaging
let messaging = null;

if (typeof window !== "undefined") {
  isSupported().then((supported) => {
    if (supported) {
      messaging = getMessaging(app);
    }
  });
}

export { messaging, analytics };
export default app;
