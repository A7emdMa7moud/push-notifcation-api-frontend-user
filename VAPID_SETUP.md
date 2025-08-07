# VAPID Key Setup Guide

## 🔑 How to Get Your VAPID Key

### 1. Go to Firebase Console
- Visit [Firebase Console](https://console.firebase.google.com/)
- Select your project

### 2. Navigate to Project Settings
- Click on the gear icon (⚙️) next to "Project Overview"
- Select "Project settings"

### 3. Go to Cloud Messaging Tab
- Click on the "Cloud Messaging" tab
- Scroll down to "Web configuration" section

### 4. Generate VAPID Key
- Click "Generate key pair" button
- Copy the generated VAPID key

### 5. Add to Environment Variables
Create a `.env.local` file in your project root and add:

```env
NEXT_PUBLIC_FIREBASE_VAPID_KEY=your_vapid_key_here
```

### 6. Update the Hook
In `src/hooks/useNotifications.js`, replace:
```javascript
vapidKey: 'YOUR_VAPID_KEY_HERE'
```
with:
```javascript
vapidKey: process.env.NEXT_PUBLIC_FIREBASE_VAPID_KEY
```

## 🚀 After Setup
1. Restart your development server
2. The notification system will work properly
3. You can test sending notifications

## 📝 Important Notes
- VAPID key is required for web push notifications
- Keep your VAPID key secure
- The key is public and can be included in client-side code
- Each Firebase project has its own VAPID key 