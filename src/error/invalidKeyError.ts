export class InvalidKeyError extends Error {
    constructor(keys: string[]) {
        super(keys.join(", ") + " invalid");
        this.name = "InvalidKeyError";
    }
}
