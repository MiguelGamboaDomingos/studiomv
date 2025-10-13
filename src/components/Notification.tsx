import React, { useEffect, useState } from 'react';
import { CheckCircle, XCircle, AlertCircle, Info, X } from 'lucide-react';

interface NotificationProps {
  type: 'success' | 'error' | 'warning' | 'info';
  title: string;
  message: string;
  duration?: number;
  onClose: () => void;
  autoClose?: boolean;
}

const Notification: React.FC<NotificationProps> = ({
  type,
  title,
  message,
  duration = 5000,
  onClose,
  autoClose = true,
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isLeaving, setIsLeaving] = useState(false);

  useEffect(() => {
    // Trigger entrance animation
    const timer = setTimeout(() => setIsVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (autoClose && duration > 0) {
      const timer = setTimeout(() => {
        handleClose();
      }, duration);
      return () => clearTimeout(timer);
    }
  }, [autoClose, duration]);

  const handleClose = () => {
    setIsLeaving(true);
    setTimeout(() => {
      onClose();
    }, 300);
  };

  const getIcon = () => {
    switch (type) {
      case 'success':
        return <CheckCircle className="w-6 h-6 text-green-500" aria-hidden="true" />;
      case 'error':
        return <XCircle className="w-6 h-6 text-red-500" aria-hidden="true" />;
      case 'warning':
        return <AlertCircle className="w-6 h-6 text-yellow-500" aria-hidden="true" />;
      case 'info':
        return <Info className="w-6 h-6 text-blue-500" aria-hidden="true" />;
      default:
        return <Info className="w-6 h-6 text-blue-500" aria-hidden="true" />;
    }
  };

  const getColorClasses = () => {
    switch (type) {
      case 'success':
        return 'border-green-500/20 bg-green-500/10 text-green-100';
      case 'error':
        return 'border-red-500/20 bg-red-500/10 text-red-100';
      case 'warning':
        return 'border-yellow-500/20 bg-yellow-500/10 text-yellow-100';
      case 'info':
        return 'border-blue-500/20 bg-blue-500/10 text-blue-100';
      default:
        return 'border-blue-500/20 bg-blue-500/10 text-blue-100';
    }
  };

  return (
    <div
      className={`fixed top-4 right-4 z-[100] max-w-md w-full transition-all duration-300 ease-out ${
        isVisible && !isLeaving
          ? 'translate-x-0 opacity-100'
          : 'translate-x-full opacity-0'
      }`}
      role="alert"
      aria-live="polite"
    >
      <div
        className={`backdrop-blur-md border rounded-lg p-4 shadow-2xl ${getColorClasses()}`}
      >
        <div className="flex items-start gap-3">
          <div className="flex-shrink-0 mt-0.5">
            {getIcon()}
          </div>
          
          <div className="flex-1 min-w-0">
            <h4 className="text-sm font-semibold mb-1">{title}</h4>
            <p className="text-sm opacity-90">{message}</p>
          </div>
          
          <button
            onClick={handleClose}
            className="flex-shrink-0 ml-2 p-1 rounded-full hover:bg-white/10 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-white/20"
            aria-label="Fechar notificação"
          >
            <X className="w-4 h-4" aria-hidden="true" />
          </button>
        </div>
        
        {/* Progress bar for auto-close */}
        {autoClose && duration > 0 && (
          <div className="mt-3 h-1 bg-white/10 rounded-full overflow-hidden">
            <div
              className="h-full bg-white/30 rounded-full transition-all ease-linear"
              style={{
                animation: `shrink ${duration}ms linear`,
                transformOrigin: 'left',
              }}
            />
          </div>
        )}
      </div>
      
      <style jsx>{`
        @keyframes shrink {
          from {
            transform: scaleX(1);
          }
          to {
            transform: scaleX(0);
          }
        }
      `}</style>
    </div>
  );
};

// Notification Manager Component
interface NotificationData {
  id: string;
  type: 'success' | 'error' | 'warning' | 'info';
  title: string;
  message: string;
  duration?: number;
  autoClose?: boolean;
}

interface NotificationManagerProps {
  notifications: NotificationData[];
  onRemove: (id: string) => void;
}

export const NotificationManager: React.FC<NotificationManagerProps> = ({
  notifications,
  onRemove,
}) => {
  return (
    <div className="fixed top-0 right-0 z-[100] p-4 space-y-2 pointer-events-none">
      {notifications.map((notification, index) => (
        <div
          key={notification.id}
          className="pointer-events-auto"
          style={{
            transform: `translateY(${index * 8}px)`,
            zIndex: 100 - index,
          }}
        >
          <Notification
            type={notification.type}
            title={notification.title}
            message={notification.message}
            duration={notification.duration}
            autoClose={notification.autoClose}
            onClose={() => onRemove(notification.id)}
          />
        </div>
      ))}
    </div>
  );
};

// Hook for managing notifications
export const useNotifications = () => {
  const [notifications, setNotifications] = useState<NotificationData[]>([]);

  const addNotification = (
    type: 'success' | 'error' | 'warning' | 'info',
    title: string,
    message: string,
    options?: {
      duration?: number;
      autoClose?: boolean;
    }
  ) => {
    const id = Math.random().toString(36).substr(2, 9);
    const notification: NotificationData = {
      id,
      type,
      title,
      message,
      duration: options?.duration ?? 5000,
      autoClose: options?.autoClose ?? true,
    };

    setNotifications(prev => [...prev, notification]);
    return id;
  };

  const removeNotification = (id: string) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  };

  const clearAll = () => {
    setNotifications([]);
  };

  // Convenience methods
  const showSuccess = (title: string, message: string, options?: { duration?: number; autoClose?: boolean }) =>
    addNotification('success', title, message, options);

  const showError = (title: string, message: string, options?: { duration?: number; autoClose?: boolean }) =>
    addNotification('error', title, message, options);

  const showWarning = (title: string, message: string, options?: { duration?: number; autoClose?: boolean }) =>
    addNotification('warning', title, message, options);

  const showInfo = (title: string, message: string, options?: { duration?: number; autoClose?: boolean }) =>
    addNotification('info', title, message, options);

  return {
    notifications,
    addNotification,
    removeNotification,
    clearAll,
    showSuccess,
    showError,
    showWarning,
    showInfo,
  };
};

export default Notification;
