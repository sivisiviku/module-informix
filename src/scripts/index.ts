import {
    ValidatorHeaderParam,
} from "le-validator2";
export const datetimeTransformer = {
    to(value: string): string {
        return value;
    },
    from(value: Date): string {
        return value ? value.toISOString() : null;
    },
};
export interface IAuthHeaderParamsProcessed {
    "content-language": "en" | "th";
    "tracer"?: "true" | "false";
    "authorization"?: string;
    "userid": string;
}
export const authHeaderParams: ValidatorHeaderParam[] = [{
    default: "en",
    enum: [ "en", "th"],
    name: "Content-Language",
    required: false,
    swagger: {
        description: "language ISO (en/th)",
        example: "en",
    },
    type: "string",
}, {
    enum: [ "true", "false"],
    name: "Tracer",
    required: false,
    swagger: {
        description: "Give payload info from radsoft",
        example: "true",
    },
    type: "string",
}, {
    name: "Authorization",
    required: false,
    swagger: {
        description: "will be pass in from api gateway",
        example: "Bearer Token",
    },
    type: "string",
}, {
    name: "userid",
    required: true,
    swagger: {
        description: "will be pass in from api gateway",
        example: "f2d4b229-6981-483f-ae4b-6501ac51b2eb",
    },
    minLength: 1,
    type: "string",
}];
export const contentType: ValidatorHeaderParam[] = [{
    default: "multipart/form-data",
    name: "Content-type",
    required: true,
    swagger: {
        description: "The Content-Type entity header is used to indicate the media type of the resource.",
        example:"text/plain"
    },
    type: "string"
}];
export interface ICommonHeaderParamsProcessed {
    "content-language": "en" | "th";
    "tracer"?: "true" | "false";
}
export const commonHeaderParams: ValidatorHeaderParam[] = [{
    default: "en",
    enum: [ "en", "th"],
    name: "Content-Language",
    required: true,
    swagger: {
        description: "language ISO (en/th)",
        example: "en",
    },
    type: "string",
}, {
    enum: [ "true", "false"],
    name: "Tracer",
    required: false,
    swagger: {
        description: "Give payload info from radsoft",
        example: "true",
    },
    type: "string",
}];
