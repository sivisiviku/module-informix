export class DocumentNotUploadedError extends Error {
    constructor() {
        super("Document not uploaded");
        this.name = "DocumentNotUploadedError";
    }
}
