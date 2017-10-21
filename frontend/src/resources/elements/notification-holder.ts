import {autoinject} from 'aurelia-framework';
import {NotificationService, Notification} from '../../lib/notification-service';

@autoinject
export class NotificationHolder {

  notifications: Array<string>;

  constructor(service: NotificationService) {
    this.notifications = service.getNotifications().map(notif => notif.message);

    service.addListener(this.updateNotifications.bind(this));
  }

  updateNotifications(notifications: Array<Notification>) {
    this.notifications = notifications.map(notif => notif.message);
  }

}
