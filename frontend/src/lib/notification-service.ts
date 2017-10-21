export interface Notification {
  message: string;
  delay: number;
}

export class NotificationService {
  private listeners: Array<Function> = new Array();
  private notifications: Array<Notification> = new Array();

  constructor() {
    console.log("Creating a notification service");
  }

  public addNotification(notification: Notification): void {
    this.notifications.push(notification);
    this.notifyListeners();

    if (notification.delay > 0) {
      setTimeout(this.removeNotification.bind(this), notification.delay,
        notification);
    }
  }

  public removeNotification(notification: Notification): void {
    this.removeFromArray(this.notifications, notification);
    this.notifyListeners();
  }

  public addNotificationMessage(message: string, delay: number = 5000): void {
    this.addNotification({message, delay});
  }

  public getNotifications(): Array<Notification> {
    return this.notifications;
  }

  public notifyListeners(): void {
    this.listeners.forEach(listener => listener(this.notifications));
  }

  public addListener(listener: Function): void {
    this.listeners.push(listener);
  }

  public removeListener(listener: Function): void {
    this.removeFromArray(this.listeners, listener);
  }

  private removeFromArray<T>(array: Array<T>, element: T): void {
    const index = array.findIndex(e => e === element);
    if (index >= 0) {
      array.splice(index, 1);
    }
  }

}
