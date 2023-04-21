export class NoUnitholderIdError extends Error {
    constructor() {
        super("no unitholder ID");
        this.name = "NoUnitholderIdError";
    }
}
