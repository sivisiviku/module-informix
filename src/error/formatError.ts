export class FormatError extends Error {
    constructor(field: string, formatMessage: string) {
        super(field + ": " + formatMessage);
        this.name = "FormatError";
    }
}
