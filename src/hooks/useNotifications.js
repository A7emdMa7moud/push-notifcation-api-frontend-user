import { useState, useEffect, useCallback } from 'react';
import { messaging } from '../config/firebase';
import { 
  getToken, 
  onMessage, 
  deleteToken 
} from 'firebase/messaging';
import toast from 'react-hot-toast';

const useNotifications = () => {
  const [fcmToken, setFcmToken] = useState(null);
  const [isSupported, setIsSupported] = useState(false);
  const [permission, setPermission] = useState('default');
  const [isLoading, setIsLoading] = useState(false);
  const [notifications, setNotifications] = useState([]);

  // Check if notifications are supported
  useEffect(() => {
    const checkSupport = async () => {
      if (typeof window !== 'undefined' && 'Notification' in window) {
        setIsSupported(true);
        setPermission(Notification.permission);
      }
    };
    checkSupport();
  }, []);

  // Request notification permission
  const requestPermission = useCallback(async () => {
    if (!isSupported) {
      toast.error('Notifications are not supported in this browser');
      return false;
    }

    try {
      setIsLoading(true);
      const permission = await Notification.requestPermission();
      setPermission(permission);
      
      if (permission === 'granted') {
        toast.success('Notification permission granted!');
        return true;
      } else {
        toast.error('Notification permission denied');
        return false;
      }
    } catch (error) {
      console.error('Error requesting permission:', error);
      toast.error('Failed to request notification permission');
      return false;
    } finally {
      setIsLoading(false);
    }
  }, [isSupported]);

  // Get FCM token
  const getFCMToken = useCallback(async () => {
    if (!messaging || permission !== 'granted') {
      return null;
    }

    try {
      setIsLoading(true);
      
      // Check if service worker is registered
      if ('serviceWorker' in navigator) {
        const registration = await navigator.serviceWorker.register('/sw.js');
        console.log('Service Worker registered:', registration);
      }

      const token = await getToken(messaging, {
        vapidKey: process.env.NEXT_PUBLIC_FIREBASE_VAPID_KEY
      });

      if (token) {
        setFcmToken(token);
        console.log('FCM Token:', token);
        toast.success('FCM token generated successfully!');
        return token;
      } else {
        toast.error('Failed to generate FCM token');
        return null;
      }
    } catch (error) {
      console.error('Error getting FCM token:', error);
      toast.error('Failed to get FCM token');
      return null;
    } finally {
      setIsLoading(false);
    }
  }, [messaging, permission]);

  // Delete FCM token
  const deleteFCMToken = useCallback(async () => {
    if (!messaging) return;

    try {
      await deleteToken(messaging);
      setFcmToken(null);
      toast.success('FCM token deleted successfully!');
    } catch (error) {
      console.error('Error deleting FCM token:', error);
      toast.error('Failed to delete FCM token');
    }
  }, [messaging]);

  // Listen for foreground messages
  useEffect(() => {
    if (!messaging) return;

    const unsubscribe = onMessage(messaging, (payload) => {
      console.log('Foreground message received:', payload);
      
      // Add notification to list
      const newNotification = {
        id: Date.now(),
        title: payload.notification?.title || 'New Notification',
        body: payload.notification?.body || 'You have a new notification',
        timestamp: new Date().toISOString(),
        data: payload.data || {}
      };
      
      setNotifications(prev => [newNotification, ...prev]);
      
      // Show toast
      toast.success(newNotification.title, {
        description: newNotification.body,
        duration: 5000
      });
    });

    return () => unsubscribe();
  }, [messaging]);

  // Initialize notifications
  const initializeNotifications = useCallback(async () => {
    if (permission === 'default') {
      const granted = await requestPermission();
      if (granted) {
        return await getFCMToken();
      }
    } else if (permission === 'granted') {
      return await getFCMToken();
    }
    return null;
  }, [permission, requestPermission, getFCMToken]);

  // Clear notifications
  const clearNotifications = useCallback(() => {
    setNotifications([]);
  }, []);

  // Remove specific notification
  const removeNotification = useCallback((id) => {
    setNotifications(prev => prev.filter(notification => notification.id !== id));
  }, []);

  return {
    fcmToken,
    isSupported,
    permission,
    isLoading,
    notifications,
    requestPermission,
    getFCMToken,
    deleteFCMToken,
    initializeNotifications,
    clearNotifications,
    removeNotification
  };
};

export default useNotifications; 