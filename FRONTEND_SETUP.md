# Frontend Setup Guide

## 🚀 Quick Start

This guide will help you set up the Push Notifications Dashboard frontend application.

## 📋 Prerequisites

- Node.js 18+ 
- npm or yarn
- Firebase project with Cloud Messaging enabled
- VAPID key from Firebase Console

## 🛠️ Installation Steps

### 1. Install Dependencies

```bash
npm install
```

### 2. Environment Configuration

Create a `.env.local` file in the project root:

```env
# Firebase Configuration
NEXT_PUBLIC_FIREBASE_VAPID_KEY=your_vapid_key_here

# Backend API URL
NEXT_PUBLIC_API_URL=https://backend-push-api-notifcation.vercel.app
```

### 3. Firebase Setup

1. **Get VAPID Key**:
   - Go to [Firebase Console](https://console.firebase.google.com/)
   - Select your project
   - Go to Project Settings > Cloud Messaging
   - Copy the VAPID key from "Web Push certificates"
   - Add it to your `.env.local` file

2. **Update Firebase Config** (if needed):
   - The Firebase config is already set up in `src/config/firebase.js`
   - If you need to use different Firebase credentials, update the config

### 4. Start Development Server

```bash
npm run dev
```

The application will be available at `https://backend-push-api-notifcation.vercel.app/`

## 📱 Features

### Home Page (`/`)
- Basic notification setup and status
- FCM token display and copy functionality
- Link to advanced notification management

### Notifications Dashboard (`/notifications`)
- **Status Panel**: Browser support, permissions, FCM token status
- **Direct Notifications**: Send to specific FCM tokens
- **Broadcast Notifications**: Send to all registered users
- **Test Notifications**: Send test notifications to current user
- **Auto-send Control**: Schedule automatic notifications
- **Notification History**: View received notifications

## 🔧 Configuration

### Service Worker
- Located at `public/sw.js`
- Handles background notifications
- Automatically registered on app load

### Firebase Configuration
- Located at `src/config/firebase.js`
- Handles Firebase initialization
- Supports both client and server-side rendering

### Custom Hook
- Located at `src/hooks/useNotifications.js`
- Manages notification state and permissions
- Handles FCM token generation and management

### API Service
- Located at `src/lib/notification.js`
- Handles communication with backend APIs
- Includes authentication and error handling

## 🎨 UI Components

- **Tailwind CSS** for styling
- **Lucide React** for icons
- **React Hot Toast** for notifications
- **Responsive design** for all screen sizes

## 🔐 Authentication

The application supports JWT authentication:
- Store JWT token in `localStorage` as `authToken`
- Token is automatically included in API requests
- Backend endpoints should validate JWT tokens

## 🚀 Deployment

### Build for Production

```bash
npm run build
```

### Start Production Server

```bash
npm start
```

### Environment Variables for Production

```env
NEXT_PUBLIC_FIREBASE_VAPID_KEY=your_production_vapid_key
NEXT_PUBLIC_API_URL=https://your-backend-url.com
```

## 🧪 Testing

### Manual Testing

1. **Notification Permissions**:
   - Open the app in a supported browser
   - Click "Request Permission" to enable notifications
   - Verify permission is granted

2. **FCM Token Generation**:
   - After permission is granted, click "Get FCM Token"
   - Verify token is generated and displayed
   - Test copying token to clipboard

3. **Sending Notifications**:
   - Go to `/notifications` page
   - Test sending direct notifications
   - Test sending broadcast notifications
   - Test auto-send functionality

4. **Receiving Notifications**:
   - Send a test notification
   - Verify notification appears in browser
   - Test notification click handling

### Browser Support

- Chrome 42+
- Firefox 44+
- Safari 16+
- Edge 17+

## 🐛 Troubleshooting

### Common Issues

1. **VAPID Key Not Working**:
   - Verify VAPID key is correct
   - Check Firebase Console configuration
   - Ensure key is added to `.env.local`

2. **Service Worker Not Registering**:
   - Check browser console for errors
   - Verify `public/sw.js` exists
   - Ensure HTTPS in production

3. **Notifications Not Working**:
   - Check browser permissions
   - Verify Firebase configuration
   - Check browser console for errors

4. **API Calls Failing**:
   - Verify backend is running
   - Check `NEXT_PUBLIC_API_URL` in `.env.local`
   - Verify authentication token if required

### Debug Mode

Enable debug logging by adding to `.env.local`:

```env
NEXT_PUBLIC_DEBUG=true
```

## 📚 Additional Resources

- [Firebase Cloud Messaging Documentation](https://firebase.google.com/docs/cloud-messaging)
- [Web Push Protocol](https://tools.ietf.org/html/rfc8030)
- [Service Worker API](https://developer.mozilla.org/en-US/docs/Web/API/Service_Worker_API)
- [Next.js Documentation](https://nextjs.org/docs)

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License. 