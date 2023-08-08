// Реализация отправки уведомления
abstract class NotificationSender {
    abstract send (message: string): void;
}

// Реализация интерфейса для отправки уведомлений
abstract class NotificationType {
    constructor (protected readonly sender: NotificationSender) {
    }

    abstract send (message: string): void;
}

class MailNotificationSender extends NotificationSender {
    send (message: string): void {
        console.log('[Mail] Send notification', message);
    }
}

class SmsNotificationSender extends NotificationSender {
    send (message: string): void {
        console.log('[SMS] Send notification', message);
    }
}

class MailNotification extends NotificationType {
    send (message: string): void {
        this.sender.send(`'''mail''':${ message }`);
    }
}

class SmsNotification extends NotificationType {
    send (message: string): void {
        this.sender.send(`'''sms''':${ message }`);
    }
}

class NewMailNotification extends NotificationType {
    send (message: string): void {
        this.sender.send(`'''new_mail''':${ message }`);
    }
}

const mailNotification: MailNotification = new MailNotification(new MailNotificationSender());
const newMailNotification: MailNotification = new NewMailNotification(new MailNotificationSender());
const smsNotification: SmsNotification   = new SmsNotification(new SmsNotificationSender());

mailNotification.send('email text');
newMailNotification.send('email text');
smsNotification.send('sms text');