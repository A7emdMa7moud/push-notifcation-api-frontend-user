import "./globals.css";
import { Toaster } from "react-hot-toast";

export const metadata = {
  title: "Push Notifications Dashboard",
  description: "A comprehensive dashboard for managing push notifications using Firebase Cloud Messaging",
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "Notifications"
  },
  formatDetection: {
    telephone: false
  },
  openGraph: {
    title: "Push Notifications Dashboard",
    description: "A comprehensive dashboard for managing push notifications",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Push Notifications Dashboard",
    description: "A comprehensive dashboard for managing push notifications",
  }
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  themeColor: '#3b82f6'
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        {/* PWA Meta Tags */}
        <meta name="application-name" content="Push Notifications Dashboard" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="Notifications" />
        <meta name="description" content="A comprehensive dashboard for managing push notifications" />
        <meta name="format-detection" content="telephone=no" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="msapplication-config" content="/browserconfig.xml" />
        <meta name="msapplication-TileColor" content="#3b82f6" />
        <meta name="msapplication-tap-highlight" content="no" />
        <meta name="theme-color" content="#3b82f6" />

        {/* Apple Touch Icons */}
        <link rel="apple-touch-icon" href="/icon-192x192.svg" />
        <link rel="apple-touch-icon" sizes="152x152" href="/icon-192x192.svg" />
        <link rel="apple-touch-icon" sizes="180x180" href="/icon-192x192.svg" />
        <link rel="apple-touch-icon" sizes="167x167" href="/icon-192x192.svg" />

        {/* Favicon */}
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon.ico" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon.ico" />
        <link rel="mask-icon" href="/favicon.ico" color="#3b82f6" />

        <script
          dangerouslySetInnerHTML={{
            __html: `
              if ('serviceWorker' in navigator) {
                window.addEventListener('load', function() {
                  navigator.serviceWorker.register('/sw.js')
                    .then(function(registration) {
                      console.log('SW registered: ', registration);
                    })
                    .catch(function(registrationError) {
                      console.log('SW registration failed: ', registrationError);
                    });
                });
              }
            `,
          }}
        />
      </head>
      <body>
        {children}
        <Toaster 
          position="top-center"
          toastOptions={{
            duration: 4000,
            style: {
              background: '#363636',
              color: '#fff',
            },
            success: {
              duration: 3000,
              iconTheme: {
                primary: '#4ade80',
                secondary: '#fff',
              },
            },
            error: {
              duration: 4000,
              iconTheme: {
                primary: '#ef4444',
                secondary: '#fff',
              },
            },
          }}
        />
      </body>
    </html>
  );
}
