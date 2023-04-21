import * as Koa from "koa";
import { PartialResponsifyValidationError } from "partial-responsify";
import {
    DataNotFoundError,
    DateRangeError,
    DocumentNotAllowUpdateError,
    DocumentNotUploadedError,
    DuplicateEntryError,
    InvalidKeyError,
    NotAuthorizeError,
    NoUnitholderIdError,
} from "../error";
import { ValidatorError } from "../lib";

enum ErrorCodes {
    E0 = "E0", // All Other Uncatch Error
    EV = "EV", // ValidatorError
    EV2 = "EV2", // PartialResponsifyValidationError
    EDOPAR = "EDOPAR", // DOPA Still Running
    EDOPAF = "EDOPAF", // DOPA Failed
    EIK = "EIK", // InvalidKeyError
    ENF = "ENF", // DataNotFoundError
    EID = "EID", // InsufficientDataError
    ENL = "ENL", // NoUnitholderIdError
    ENL2 = "ENL2", // DocumentNotUploadedError
    ENL3 = "ENL3", // DocumentNotAllowUpdateError
    ENL4 = "ENL4", // CustomerStatusNotAllowUpdateError
    ENL5 = "ENL5", // NotApprovedCustomerError
    ECPAMC = "ECPAMC", // AmlaCheckFailError
    ECPAMV = "ECPAMV", // AmlaCheckFailError
    EPA = "EPA", // AmlaCheckFailError
    EDR = "EDR", // DateRangeError
    ENA = "ENA", // NotAuthorizeError
    EMA = "EMA", // MiroserviceApiError
    EDE = "EDE", // DuplicateEntryError
    RE = "RE" // RadsoftCriticalError
}
export async function errorCatcher(ctx: Koa.Context, next: () => Promise<any>): Promise<void> {
    try {
        await next();
    } catch (err) {
        // future use contentLanguage to turn ValidatorError and PartialResponsifyValidationError to multilanguage;
        let status = err.status || 500;
        const errorCode = ErrorCodes.E0;
        const body: {
            _tracer?: any;
            errorCode: string;
            errorDetails?: Array<{
                errorCode: string;
                errorDesc: string;
            }>;
            message: string;
        } = {
            errorCode,
            message: err.message,
        };
        console.log(err);
        if (err instanceof ValidatorError) {
            status = 400;
            body.errorCode = ErrorCodes.EV;
        } else if (err instanceof PartialResponsifyValidationError) {
            status = 400;
            body.errorCode = ErrorCodes.EV2;
            console.log(err.formatErrs && err.formatErrs.map((field) => field.name));
        } else if (err instanceof InvalidKeyError) {
            status = 400;
            body.errorCode = ErrorCodes.EIK;
        } else if (err instanceof DataNotFoundError) {
            status = 400;
            body.errorCode = ErrorCodes.ENF;
        } else if (err instanceof NoUnitholderIdError) {
            status = 400;
            body.errorCode = ErrorCodes.ENL;
        } else if (err instanceof DocumentNotUploadedError) {
            status = 400;
            body.errorCode = ErrorCodes.ENL2;
        } else if (err instanceof DocumentNotAllowUpdateError) {
            status = 400;
            body.errorCode = ErrorCodes.ENL3;
        } else if (err instanceof DateRangeError) {
            status = 400;
            body.errorCode = ErrorCodes.EDR;
        } else if (err instanceof DuplicateEntryError) {
            status = 400;
            body.errorCode = ErrorCodes.EDE;
        } else if (err instanceof NotAuthorizeError) {
            status = 401;
            body.errorCode = ErrorCodes.ENA;
        }
        console.log(err);
        ctx.status = status;
        ctx.body = body;
        if (status === 500) {
            ctx.app.emit("error", err, ctx);
        }
    }
}
