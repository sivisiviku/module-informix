export class DateRangeError extends Error {
    constructor(field: string, formatMessage: string) {
        super(field + ": " + formatMessage);
        this.name = "DateRangeError";
    }
}
