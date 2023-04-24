import { IRouterContext } from "koa-router";
import { IAllRoute, IDI, IOpenApiRoute } from "../../../../../interface";
import { ValidatorGetParam } from "../../../../../lib";
import { pageableGetParamValidator } from "../../../../../lib/appValidator";

const path = "/v1/customers";
const method = "GET";
const get: ValidatorGetParam[] = [
    ...pageableGetParamValidator,
    {
        minLength: 1,
        name: "fields",
        required: false,
        swagger: {
            description: "Fields needed from response",
            example: "Code,Desc,ID,LastUpdate",
        },
        type: "string",
        default: "Code,Desc,ID,LastUpdate",
    }
];
const func = async (ctx: IRouterContext): Promise<void> => {
    const di: IDI = ctx.state.di;
    const customers = di.informix.findAll("customers");

    ctx.status = 200;
    ctx.body = {
        data: customers
    }
}


export const openapiGetCustomer: IOpenApiRoute = {
    // disabled: true,
    get,
    method,
    path,
    tags: ["customer"],
};

export const getCustomer: IAllRoute = {
    func,
    method,
    path,
};