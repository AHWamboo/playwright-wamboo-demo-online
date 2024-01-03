import { type ErrorName } from '.';

export class BaseError extends Error {
    errorName: ErrorName;
    message: string;

    constructor({ errorName, message }: { errorName: ErrorName; message: string }) {
        super();
        this.errorName = errorName;
        this.message = message;
    }
}
