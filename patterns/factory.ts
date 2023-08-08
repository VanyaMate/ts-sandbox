enum NotificationType {
    ERROR,
    SUCCESS,
    COMMON,
}

interface IBaseNotificationData {
    title: string;
    description: string;
    duration: number;
}

abstract class BaseNotification {
    abstract title: string;
    abstract description: string;
    abstract duration: number;

    abstract show (): void;

    abstract hide (): void;
}

class DefaultNotification extends BaseNotification {
    public description: string;
    public duration: number;
    public title: string;

    constructor (data: IBaseNotificationData) {
        super();

        this.title       = data.title;
        this.description = data.description;
        this.duration    = data.duration;
    }

    hide (): void {
        console.log(`[Notification] Hide ${ this.title }.`);
    }

    show (): void {
        console.log(`[Notification] Show ${ this.title }. ${ this.description }`);
    }

}

class ErrorNotification extends BaseNotification {
    public title: string;
    public description: string;
    public duration: number;

    constructor (data: IBaseNotificationData) {
        super();

        this.title       = data.title;
        this.description = data.description;
        this.duration    = data.duration;
    }

    hide (): void {
        console.log(`[Notification: Error] Hide ${ this.title }.`);
    }

    show (): void {
        console.log(`[Notification: Error] Show ${ this.title }. ${ this.description }`);
    }
}

class SuccessNotification extends BaseNotification {
    public title: string;
    public description: string;
    public duration: number;

    constructor (data: IBaseNotificationData) {
        super();

        this.title       = data.title;
        this.description = data.description;
        this.duration    = data.duration;
    }

    hide (): void {
        console.log(`[Notification: Success] Hide ${ this.title }.`);
    }

    show (): void {
        console.log(`[Notification: Success] Show ${ this.title }. ${ this.description }`);
    }
}

class NotificationFactory {
    create (type: NotificationType, data: IBaseNotificationData): BaseNotification {
        if (type === NotificationType.ERROR) {
            return new ErrorNotification(data);
        } else if (type === NotificationType.SUCCESS) {
            return new SuccessNotification(data);
        } else {
            return new DefaultNotification(data);
        }
    }
}

const notificationFactory: NotificationFactory = new NotificationFactory();

const error: BaseNotification = notificationFactory.create(NotificationType.ERROR, {
    title      : 'Bad request',
    description: 'Неправильно заполнены данные',
    duration   : 1000,
});

const success: BaseNotification = notificationFactory.create(NotificationType.SUCCESS, {
    title      : 'Success',
    description: 'Форма отправилена',
    duration   : 2000,
});

const notification = notificationFactory.create(NotificationType.COMMON, {
    title      : 'Event',
    description: 'Пользователь нажал на пробел',
    duration   : 1500,
});

error.show();
success.show();
notification.show();

