export class DocumentNotAllowUpdateError extends Error {
    constructor() {
        super("Document status not allow update");
        this.name = "DocumentNotAllowUpdateError";
    }
}
