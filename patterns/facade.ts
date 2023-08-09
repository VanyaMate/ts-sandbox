abstract class NotificationMethod {
    abstract send (to: string, subject: string, message: string): void;
}

class SmsNotification extends NotificationMethod {
    send (to: string, subject: string, message: string): void {
        console.log('[Notification] SMS: Send to', to, `'''${ subject }''': ${ message }`);
    }
}

class EmailNotification extends NotificationMethod {
    send (to: string, subject: string, message: string): void {
        console.log('[Notification] EMAIL: Send to', to, `'''${ subject }''': ${ message }`);
    }
}

class NotificationManager {
    constructor (private readonly methods: NotificationMethod[]) {
    }

    send (to: string, subject: string, message: string) {
        this.methods.forEach((method) => method.send(to, subject, message));
    }
}

class NotificationManagerStatic {
    private readonly smsMethod: SmsNotification     = new SmsNotification();
    private readonly emailMethod: EmailNotification = new EmailNotification();

    constructor () {
    }

    send (...args: [ to: string, subject: string, message: string ]) {
        this.smsMethod.send.apply(this.smsMethod, args);
        this.emailMethod.send.apply(this.emailMethod, args);
    }
}

const notificationManager: NotificationManager = new NotificationManager([
    new SmsNotification(),
    new EmailNotification(),
]);

const notificationManagerStatic: NotificationManagerStatic = new NotificationManagerStatic();

notificationManager.send('Vanya', 'Subject message', 'Body message');
notificationManagerStatic.send('Static', 'Subject static', 'Body static');
