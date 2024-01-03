type ErrorName = 'MISSING_ENV_VARIABLE';

export class BaseError extends Error {
    errorName: ErrorName;
    message: string;

    constructor({ errorName, message }: { errorName: ErrorName; message: string; cause?: any }) {
        super();
        this.errorName = errorName;
        this.message = message;
    }
}
