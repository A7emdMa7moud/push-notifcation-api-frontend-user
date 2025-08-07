'use client';

import { useState, useEffect } from 'react';
import { Toaster, toast } from 'react-hot-toast';
import useNotifications from '../../hooks/useNotifications';
import notificationService from '../../lib/notification';
import Navigation from '../../components/Navigation';
import { 
  Bell, 
  Send, 
  Users, 
  Play, 
  Stop, 
  Trash2, 
  Copy, 
  CheckCircle,
  AlertCircle,
  Settings,
  RefreshCw
} from 'lucide-react';
import PWAInstallPrompt from '../../components/PWAInstallPrompt';

export default function NotificationsPage() {
  const {
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
  } = useNotifications();

  const [formData, setFormData] = useState({
    directToken: '',
    directTitle: '',
    directBody: '',
    broadcastTitle: '',
    broadcastBody: '',
    autoInterval: 30,
    autoDuration: 300
  });

  const [autoSendStatus, setAutoSendStatus] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Initialize notifications on component mount
  useEffect(() => {
    initializeNotifications();
    getAutoSendStatus();
  }, []);

  // Get auto-send status
  const getAutoSendStatus = async () => {
    try {
      const status = await notificationService.getAutoSendStatus();
      setAutoSendStatus(status);
    } catch (error) {
      console.error('Failed to get auto-send status:', error);
    }
  };

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Register token with backend
  const registerTokenWithBackend = async () => {
    if (!fcmToken) {
      toast.error('No FCM token available');
      return;
    }

    try {
      setIsSubmitting(true);
      await notificationService.registerToken(fcmToken);
      toast.success('Token registered with backend successfully!');
    } catch (error) {
      toast.error(error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Send direct notification
  const sendDirectNotification = async (e) => {
    e.preventDefault();
    const { directToken, directTitle, directBody } = formData;

    if (!directToken || !directTitle || !directBody) {
      toast.error('Please fill all required fields');
      return;
    }

    try {
      setIsSubmitting(true);
      await notificationService.sendDirectNotification(directToken, directTitle, directBody);
      toast.success('Direct notification sent successfully!');
      setFormData(prev => ({
        ...prev,
        directToken: '',
        directTitle: '',
        directBody: ''
      }));
    } catch (error) {
      toast.error(error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Send broadcast notification
  const sendBroadcastNotification = async (e) => {
    e.preventDefault();
    const { broadcastTitle, broadcastBody } = formData;

    if (!broadcastTitle || !broadcastBody) {
      toast.error('Please fill all required fields');
      return;
    }

    try {
      setIsSubmitting(true);
      await notificationService.sendBroadcastNotification(broadcastTitle, broadcastBody);
      toast.success('Broadcast notification sent successfully!');
      setFormData(prev => ({
        ...prev,
        broadcastTitle: '',
        broadcastBody: ''
      }));
    } catch (error) {
      toast.error(error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Send test notification
  const sendTestNotification = async () => {
    try {
      setIsSubmitting(true);
      await notificationService.sendTestNotification();
      toast.success('Test notification sent successfully!');
    } catch (error) {
      toast.error(error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Start auto-send
  const startAutoSend = async (e) => {
    e.preventDefault();
    const { autoInterval, autoDuration } = formData;

    try {
      setIsSubmitting(true);
      await notificationService.startAutoSend(parseInt(autoInterval), parseInt(autoDuration));
      toast.success('Auto-send started successfully!');
      getAutoSendStatus();
    } catch (error) {
      toast.error(error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Stop auto-send
  const stopAutoSend = async () => {
    try {
      setIsSubmitting(true);
      await notificationService.stopAutoSend();
      toast.success('Auto-send stopped successfully!');
      getAutoSendStatus();
    } catch (error) {
      toast.error(error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Copy token to clipboard
  const copyToken = async () => {
    if (!fcmToken) {
      toast.error('No token to copy');
      return;
    }

    try {
      await navigator.clipboard.writeText(fcmToken);
      toast.success('Token copied to clipboard!');
    } catch (error) {
      toast.error('Failed to copy token');
    }
  };

  // Format timestamp
  const formatTime = (timestamp) => {
    return new Date(timestamp).toLocaleString();
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      <Toaster position="top-right" />
      
      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Push Notifications Dashboard
          </h1>
          <p className="text-gray-600">
            Manage and send push notifications using Firebase Cloud Messaging
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Status & Controls */}
          <div className="lg:col-span-1 space-y-6">
            {/* Status Card */}
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-lg font-semibold mb-4 flex items-center">
                <Bell className="w-5 h-5 mr-2" />
                Notification Status
              </h2>
              
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Browser Support:</span>
                  <span className={`text-sm font-medium ${isSupported ? 'text-green-600' : 'text-red-600'}`}>
                    {isSupported ? 'Supported' : 'Not Supported'}
                  </span>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Permission:</span>
                  <span className={`text-sm font-medium ${
                    permission === 'granted' ? 'text-green-600' : 
                    permission === 'denied' ? 'text-red-600' : 'text-yellow-600'
                  }`}>
                    {permission.charAt(0).toUpperCase() + permission.slice(1)}
                  </span>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">FCM Token:</span>
                  <span className={`text-sm font-medium ${fcmToken ? 'text-green-600' : 'text-red-600'}`}>
                    {fcmToken ? 'Available' : 'Not Available'}
                  </span>
                </div>
              </div>

              <div className="mt-4 space-y-2">
                {permission === 'default' && (
                  <button
                    onClick={requestPermission}
                    disabled={isLoading}
                    className="w-full bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 disabled:opacity-50"
                  >
                    {isLoading ? 'Requesting...' : 'Request Permission'}
                  </button>
                )}
                
                {permission === 'granted' && !fcmToken && (
                  <button
                    onClick={getFCMToken}
                    disabled={isLoading}
                    className="w-full bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 disabled:opacity-50"
                  >
                    {isLoading ? 'Getting Token...' : 'Get FCM Token'}
                  </button>
                )}
                
                {fcmToken && (
                  <button
                    onClick={registerTokenWithBackend}
                    disabled={isSubmitting}
                    className="w-full bg-purple-600 text-white px-4 py-2 rounded-md hover:bg-purple-700 disabled:opacity-50"
                  >
                    {isSubmitting ? 'Registering...' : 'Register with Backend'}
                  </button>
                )}
              </div>
            </div>

            {/* Token Display */}
            {fcmToken && (
              <div className="bg-white rounded-lg shadow p-6">
                <h3 className="text-lg font-semibold mb-3">FCM Token</h3>
                <div className="bg-gray-100 p-3 rounded-md">
                  <p className="text-xs text-gray-600 break-all">{fcmToken}</p>
                </div>
                <button
                  onClick={copyToken}
                  className="mt-2 flex items-center justify-center w-full bg-gray-600 text-white px-4 py-2 rounded-md hover:bg-gray-700"
                >
                  <Copy className="w-4 h-4 mr-2" />
                  Copy Token
                </button>
              </div>
            )}

            {/* Auto-Send Status */}
            {autoSendStatus && (
              <div className="bg-white rounded-lg shadow p-6">
                <h3 className="text-lg font-semibold mb-3">Auto-Send Status</h3>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Status:</span>
                    <span className={`text-sm font-medium ${
                      autoSendStatus.isRunning ? 'text-green-600' : 'text-red-600'
                    }`}>
                      {autoSendStatus.isRunning ? 'Running' : 'Stopped'}
                    </span>
                  </div>
                  {autoSendStatus.isRunning && (
                    <>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-600">Interval:</span>
                        <span className="text-sm font-medium">{autoSendStatus.interval}s</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-600">Duration:</span>
                        <span className="text-sm font-medium">{autoSendStatus.duration}s</span>
                      </div>
                    </>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Right Column - Forms & Notifications */}
          <div className="lg:col-span-2 space-y-6">
            {/* Send Notifications Forms */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Direct Notification */}
              <div className="bg-white rounded-lg shadow p-6">
                <h2 className="text-lg font-semibold mb-4 flex items-center">
                  <Send className="w-5 h-5 mr-2" />
                  Direct Notification
                </h2>
                
                <form onSubmit={sendDirectNotification} className="space-y-3">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Token
                    </label>
                    <input
                      type="text"
                      name="directToken"
                      value={formData.directToken}
                      onChange={handleInputChange}
                      placeholder="Enter FCM token"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Title
                    </label>
                    <input
                      type="text"
                      name="directTitle"
                      value={formData.directTitle}
                      onChange={handleInputChange}
                      placeholder="Notification title"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Body
                    </label>
                    <textarea
                      name="directBody"
                      value={formData.directBody}
                      onChange={handleInputChange}
                      placeholder="Notification message"
                      rows="3"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      required
                    />
                  </div>
                  
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 disabled:opacity-50"
                  >
                    {isSubmitting ? 'Sending...' : 'Send Direct'}
                  </button>
                </form>
              </div>

              {/* Broadcast Notification */}
              <div className="bg-white rounded-lg shadow p-6">
                <h2 className="text-lg font-semibold mb-4 flex items-center">
                  <Users className="w-5 h-5 mr-2" />
                  Broadcast Notification
                </h2>
                
                <form onSubmit={sendBroadcastNotification} className="space-y-3">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Title
                    </label>
                    <input
                      type="text"
                      name="broadcastTitle"
                      value={formData.broadcastTitle}
                      onChange={handleInputChange}
                      placeholder="Notification title"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Body
                    </label>
                    <textarea
                      name="broadcastBody"
                      value={formData.broadcastBody}
                      onChange={handleInputChange}
                      placeholder="Notification message"
                      rows="3"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      required
                    />
                  </div>
                  
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 disabled:opacity-50"
                  >
                    {isSubmitting ? 'Sending...' : 'Send Broadcast'}
                  </button>
                </form>
              </div>
            </div>

            {/* Test & Auto-Send Controls */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Test Notification */}
              <div className="bg-white rounded-lg shadow p-6">
                <h2 className="text-lg font-semibold mb-4">Test Notification</h2>
                <p className="text-sm text-gray-600 mb-4">
                  Send a test notification to the current user
                </p>
                <button
                  onClick={sendTestNotification}
                  disabled={isSubmitting || !fcmToken}
                  className="w-full bg-yellow-600 text-white px-4 py-2 rounded-md hover:bg-yellow-700 disabled:opacity-50"
                >
                  {isSubmitting ? 'Sending...' : 'Send Test'}
                </button>
              </div>

              {/* Auto-Send Control */}
              <div className="bg-white rounded-lg shadow p-6">
                <h2 className="text-lg font-semibold mb-4">Auto-Send Control</h2>
                
                {!autoSendStatus?.isRunning ? (
                  <form onSubmit={startAutoSend} className="space-y-3">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Interval (seconds)
                      </label>
                      <input
                        type="number"
                        name="autoInterval"
                        value={formData.autoInterval}
                        onChange={handleInputChange}
                        min="5"
                        max="3600"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Duration (seconds)
                      </label>
                      <input
                        type="number"
                        name="autoDuration"
                        value={formData.autoDuration}
                        onChange={handleInputChange}
                        min="30"
                        max="3600"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 disabled:opacity-50"
                    >
                      {isSubmitting ? 'Starting...' : 'Start Auto-Send'}
                    </button>
                  </form>
                ) : (
                  <div className="space-y-3">
                    <p className="text-sm text-gray-600">
                      Auto-send is currently running
                    </p>
                    <button
                      onClick={stopAutoSend}
                      disabled={isSubmitting}
                      className="w-full bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 disabled:opacity-50"
                    >
                      {isSubmitting ? 'Stopping...' : 'Stop Auto-Send'}
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* Received Notifications */}
            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold">Received Notifications</h2>
                <div className="flex space-x-2">
                  <button
                    onClick={clearNotifications}
                    className="text-red-600 hover:text-red-700"
                    title="Clear all notifications"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>
              </div>
              
              {notifications.length === 0 ? (
                <p className="text-gray-500 text-center py-8">
                  No notifications received yet
                </p>
              ) : (
                <div className="space-y-3 max-h-96 overflow-y-auto">
                  {notifications.map((notification) => (
                    <div
                      key={notification.id}
                      className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50"
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <h3 className="font-medium text-gray-900">
                            {notification.title}
                          </h3>
                          <p className="text-sm text-gray-600 mt-1">
                            {notification.body}
                          </p>
                          <p className="text-xs text-gray-400 mt-2">
                            {formatTime(notification.timestamp)}
                          </p>
                        </div>
                        <button
                          onClick={() => removeNotification(notification.id)}
                          className="text-red-600 hover:text-red-700 ml-2"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
                 </div>
       </div>
       <PWAInstallPrompt />
     </div>
   );
 } 