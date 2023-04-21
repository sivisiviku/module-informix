export class NotAuthorizeError extends Error {
    constructor() {
        super("Not Authorized");
        this.name = "NotAuthorizeError";
    }
}
