export class DuplicateEntryError extends Error {
    constructor(field: string) {
        super(field + " has duplicate value");
        this.name = "DuplicateEntryError";
    }
}
