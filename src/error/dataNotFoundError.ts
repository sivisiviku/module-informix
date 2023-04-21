export class DataNotFoundError extends Error {
    constructor(message?: string) {
        super(message ? `Data not found: ${message}` : "Data not found");
        this.name = "DataNotFoundError";
    }
}
