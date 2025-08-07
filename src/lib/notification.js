// lib/notification.js

import { messaging } from "../config/firebase";
import { getToken, onMessage } from "firebase/messaging";
import axios from "axios";

// Base API configuration
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

// Create axios instance with default config
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('authToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor for error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('API Error:', error.response?.data || error.message);
    return Promise.reject(error);
  }
);

class NotificationService {
  // Register FCM token with backend
  async registerToken(token, userId = null) {
    try {
      const response = await api.post('/api/notifications/register-token', {
        token,
        userId
      });
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to register token');
    }
  }

  // Send direct notification to specific token
  async sendDirectNotification(token, title, body, data = {}) {
    try {
      const response = await api.post('/api/notifications/send-direct', {
        token,
        title,
        body,
        data
      });
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to send direct notification');
    }
  }

  // Send broadcast notification to all users
  async sendBroadcastNotification(title, body, data = {}) {
    try {
      const response = await api.post('/api/notifications/broadcast', {
        title,
        body,
        data
      });
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to send broadcast notification');
    }
  }

  // Send test notification to current user
  async sendTestNotification() {
    try {
      const response = await api.post('/api/notifications/simple-test');
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to send test notification');
    }
  }

  // Start auto-send notifications
  async startAutoSend(interval, duration) {
    try {
      const response = await api.post('/api/notifications/start-auto-send', {
        interval,
        duration
      });
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to start auto-send');
    }
  }

  // Stop auto-send notifications
  async stopAutoSend() {
    try {
      const response = await api.post('/api/notifications/stop-auto-send');
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to stop auto-send');
    }
  }

  // Get notification history
  async getNotificationHistory(limit = 50) {
    try {
      const response = await api.get(`/api/notifications/history?limit=${limit}`);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to get notification history');
    }
  }

  // Get auto-send status
  async getAutoSendStatus() {
    try {
      const response = await api.get('/api/notifications/auto-send-status');
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to get auto-send status');
    }
  }

  // Delete notification token
  async deleteToken(token) {
    try {
      const response = await api.delete('/api/notifications/delete-token', {
        data: { token }
      });
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to delete token');
    }
  }

  // Get user's notification settings
  async getUserSettings() {
    try {
      const response = await api.get('/api/notifications/user-settings');
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to get user settings');
    }
  }

  // Update user's notification settings
  async updateUserSettings(settings) {
    try {
      const response = await api.put('/api/notifications/user-settings', settings);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to update user settings');
    }
  }
}

// Create singleton instance
const notificationService = new NotificationService();

export { notificationService };
export default notificationService;
