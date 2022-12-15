import { Injectable } from '@nestjs/common'
import { NotificationsRepository } from '../repositories/notifications-repository'
import { NotificationNotFound } from './errors/notification-not-found';

interface unreadNotificationRequest {
  notificationId: string;
}

type unreadNotificationResponse = void

@Injectable()
export class UnreadNotification {
  constructor(private notificationsRepository: NotificationsRepository) {}
    
  async execute(
    request: unreadNotificationRequest,
  ): Promise<unreadNotificationResponse> {
    const { notificationId } = request;

    const notification = await this.notificationsRepository.findById(notificationId);

    if (!notification) {
      throw new NotificationNotFound();
    }

    notification.unread();

    this.notificationsRepository.save(notification);
  }
}