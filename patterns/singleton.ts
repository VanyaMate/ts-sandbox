interface IError {
    code: number;
    message: string;
}

class ErrorLog {

    private _logs: IError[] = [];

    get logs (): IError[] {
        return this._logs;
    }

    public add (error: IError) {
        this._logs.push(error);
    };

}

class ErrorLogger {
    static instance: ErrorLog = new ErrorLog();
}

const logger = ErrorLogger.instance;

logger.add({ code: 400, message: 'Bad request' });

console.log(logger.logs);