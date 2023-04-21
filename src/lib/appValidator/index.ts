import {
    ValidatorGetParam,
} from "le-validator2";

export const pageableGetParamValidator: ValidatorGetParam[] = [{
    name: "page",
    required: false,
    swagger: {
        description: "Page",
        example: 1,
    },
    type: "number",
    default: 1,
}, {
    name: "size",
    required: false,
    swagger: {
        description: "Size per page",
        example: 10,
    },
    type: "number",
    default: 10,
}, {
    name: "sort",
    required: false,
    swagger: {
        description: "Sorting",
        example: "code,name,nameEn,nameTh",
    },
    type: "string",
    default: "",
}];

export class PageableGetParam {
    public page: number;
    public size: number;
    public sort: string;
    public search: string;
}
