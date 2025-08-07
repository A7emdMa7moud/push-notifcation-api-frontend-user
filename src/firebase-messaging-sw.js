// This file must be at the root of your public directory!

importScripts(
  "https://www.gstatic.com/firebasejs/10.12.2/firebase-app-compat.js"
);
importScripts(
  "https://www.gstatic.com/firebasejs/10.12.2/firebase-messaging-compat.js"
);

firebase.initializeApp({
  apiKey: "AIzaSyChecrqkWDyGweGw1nCX7iOcrWHzmAW0oQ",
  authDomain: "push-notification-db7f4.firebaseapp.com",
  projectId: "push-notification-db7f4",
  messagingSenderId: "159657696935",
  appId: "1:159657696935:web:f21ed6a2c6338eb0d68582",
  // ...other config
});

const messaging = firebase.messaging();

messaging.onBackgroundMessage(function (payload) {
  // Customize notification here
  self.registration.showNotification(payload.notification.title, {
    body: payload.notification.body,
    icon: "/icon-192x192.png",
  });
});
