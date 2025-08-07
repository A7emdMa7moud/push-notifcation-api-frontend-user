# Push Notifications Dashboard

A comprehensive Next.js application for managing and sending push notifications using Firebase Cloud Messaging (FCM).

## 🚀 Features

- ✅ **Firebase Cloud Messaging Integration**
- ✅ **Service Worker for Background Notifications**
- ✅ **Real-time Notification Management**
- ✅ **Direct & Broadcast Notifications**
- ✅ **Auto-send Notifications**
- ✅ **Token Management**
- ✅ **Modern UI with Tailwind CSS**
- ✅ **Toast Notifications**
- ✅ **Responsive Design**

## 📋 Prerequisites

- Node.js 18+ 
- Firebase Project
- VAPID Key (see [VAPID_SETUP.md](./VAPID_SETUP.md))

## 🛠️ Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd frontend-user
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   Create a `.env.local` file:
   ```env
   NEXT_PUBLIC_FIREBASE_VAPID_KEY=your_vapid_key_here
   NEXT_PUBLIC_API_URL=http://localhost:5000
   ```

4. **Configure Firebase**
   - Update `src/config/firebase.js` with your Firebase config
   - Get VAPID key from Firebase Console (see VAPID_SETUP.md)

5. **Run the development server**
   ```bash
   npm run dev
   ```

## 📱 Usage

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

## 🔧 API Endpoints

The application expects these backend endpoints:

- `POST /api/notifications/register-token` - Register FCM token
- `POST /api/notifications/send-direct` - Send direct notification
- `POST /api/notifications/broadcast` - Send broadcast notification
- `POST /api/notifications/simple-test` - Send test notification
- `POST /api/notifications/start-auto-send` - Start auto-send
- `POST /api/notifications/stop-auto-send` - Stop auto-send
- `GET /api/notifications/auto-send-status` - Get auto-send status

## 🏗️ Project Structure

```
src/
├── app/
│   ├── notifications/
│   │   └── page.js          # Notifications dashboard
│   ├── layout.js            # Root layout
│   ├── page.js              # Home page
│   └── globals.css          # Global styles
├── components/
│   └── BackendStatus.js     # Backend status component
├── config/
│   └── firebase.js          # Firebase configuration
├── hooks/
│   └── useNotifications.js  # Custom hook for notifications
└── lib/
    └── notification.js      # API service for notifications
```

## 🔐 Authentication

The application supports JWT authentication:
- Store JWT token in `localStorage` as `authToken`
- Token is automatically included in API requests
- Backend endpoints should validate JWT tokens

## 🎨 UI Components

- **Tailwind CSS** for styling
- **Lucide React** for icons
- **React Hot Toast** for notifications
- **Responsive design** for all screen sizes

## 🚀 Deployment

1. **Build the application**
   ```bash
   npm run build
   ```

2. **Start production server**
   ```bash
   npm start
   ```

3. **Environment variables for production**
   ```env
   NEXT_PUBLIC_FIREBASE_VAPID_KEY=your_production_vapid_key
   NEXT_PUBLIC_API_URL=https://your-backend-url.com
   ```

## 📝 Development

- **ESLint** for code linting
- **Next.js 15** with App Router
- **React 19** with hooks
- **TypeScript** support available

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 🆘 Support

For issues and questions:
1. Check the [VAPID_SETUP.md](./VAPID_SETUP.md) for setup issues
2. Review Firebase Console configuration
3. Check browser console for errors
4. Verify backend API endpoints are working
