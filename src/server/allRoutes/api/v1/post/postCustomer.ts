import { IRouterContext } from "koa-router";
import { IAllRoute, IDI, IOpenApiRoute } from "../../../../../interface";
import { BodyFormat, ValidatorGetParam } from "../../../../../lib";
import * as dayjs from "dayjs";
import { Customers } from "../../../../../entity";


const path = "/v1/customer";
const method = "POST";
const get: ValidatorGetParam[] = [];

const body: BodyFormat = {
    required: true,
    type: "object",
    swagger: {
        description: "",
        example: {
            code: "",
            description: "",
        },
    },
    fields: { // To Be Determined
        id: {
            type: "number",
            required: true
        },
        firstname: {
            type: "string",
            required: true
        },
        lastname: {
            type: "string",
            required: true
        },
        birthdate: {
            type: "string",
            required: true
        },
        email: {
            type: "string",
            required: true
        },
    },
};


const func = async (ctx: IRouterContext): Promise<void> => {
    const di: IDI = ctx.state.di;
    console.log(di.toString(), body.toString());

    const requestBody = di.validator.processBody<{
        id: number,
        firstname: string,
        lastname: string,
        birthdate: string,
        email: string
    }>(body, ctx.request.body);
    
    const exist = di.informix.findOne("customers", "id", requestBody.id);
    if(exist.data) {
        ctx.status = 400;
        ctx.body = {
            message: `Customer id ${requestBody.id} already exist.`
        };
        return;
    }
    const customer: Customers = {
        id: requestBody.id,
        firstname: requestBody.firstname,
        lastname: requestBody.lastname,
        birthdate: requestBody.birthdate,
        email: requestBody.email,
    }
    await di.informix.insertData("customers", customer);

    ctx.status = 200;
    ctx.body = {
        message: `Customer Data Added.`,
        id: requestBody.id
    }
}


export const openapiPostCustomer: IOpenApiRoute = {
    // disabled: true,
    get,
    method,
    path,
    tags: ["customer"],
};

export const postCustomer: IAllRoute = {
    func,
    method,
    path,
};