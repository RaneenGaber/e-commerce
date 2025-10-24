import { Injectable, signal } from '@angular/core';

export interface NotificationMessage {
  id: string;
  type: 'success' | 'error' | 'warning' | 'info';
  title: string;
  message: string;
  duration?: number; // Auto-dismiss duration in milliseconds
  timestamp: Date;
}

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  private notifications = signal<NotificationMessage[]>([]);

  public notifications$ = this.notifications.asReadonly();

  /**
   * Show success notification
   */
  success(title: string, message: string, duration: number = 5000): void {
    this.addNotification({
      type: 'success',
      title,
      message,
      duration
    });
  }

  /**
   * Show error notification
   */
  error(title: string, message: string, duration: number = 0): void {
    this.addNotification({
      type: 'error',
      title,
      message,
      duration
    });
  }

  /**
   * Show warning notification
   */
  warning(title: string, message: string, duration: number = 5000): void {
    this.addNotification({
      type: 'warning',
      title,
      message,
      duration
    });
  }

  /**
   * Show info notification
   */
  info(title: string, message: string, duration: number = 5000): void {
    this.addNotification({
      type: 'info',
      title,
      message,
      duration
    });
  }

  /**
   * Add notification to the list
   */
  private addNotification(notification: Omit<NotificationMessage, 'id' | 'timestamp'>): void {
    const newNotification: NotificationMessage = {
      ...notification,
      id: this.generateId(),
      timestamp: new Date()
    };

    this.notifications.update(notifications => [...notifications, newNotification]);

    // Auto-dismiss if duration is set
    if (notification.duration && notification.duration > 0) {
      setTimeout(() => {
        this.removeNotification(newNotification.id);
      }, notification.duration);
    }
  }

  /**
   * Remove notification by ID
   */
  removeNotification(id: string): void {
    this.notifications.update(notifications =>
      notifications.filter(notification => notification.id !== id)
    );
  }

  /**
   * Generate unique ID for notifications
   */
  private generateId(): string {
    return Math.random().toString(36).substr(2, 9);
  }
}
