import { IRouterContext } from "koa-router";
import { Customers } from "../../../../../entity";
import { IAllRoute, IDI, IOpenApiRoute } from "../../../../../interface";
import { BodyFormat, ValidatorGetParam, ValidatorPathParam } from "../../../../../lib";

const path = "/v1/customer/:id";
const method = "PUT";
const get: ValidatorGetParam[] = [];

const pathParams: ValidatorPathParam[] = [{
    name: "id",
    required: false,
    swagger: {
        description: "",
        example: "",
    },
    type: "string",
}];

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
    
    // Validate query params
    di.validator.processQuery(get, ctx.request.query);
    const params = di.validator.processPath<{ id: number }>(pathParams, ctx.params);
    const requestBody = di.validator.processBody<{
        firstname: string,
        lastname: string,
        birthdate: string,
        email: string
    }>(body, ctx.request.body);
    
    const exist = di.informix.findOne("customers", "id", params.id);

    if(exist.error) {
        ctx.status = exist.status;
        ctx.body = {
            message: exist.message,
        }
        return;
    }
    
    const updateData = {
        firstname: requestBody.firstname,
        lastname: requestBody.lastname,
        birthdate: requestBody.birthdate,
        email: requestBody.email
    }
    const updateRecord: any = await di.informix.updateByColumn("customers", updateData, "id", Number(params.id));
    ctx.status = updateRecord.status,
    ctx.body = {
        message: updateRecord.message,
        data: di.informix.findOne("customers", "id", params.id).data
    }
}


export const openapiUpdateCustomer: IOpenApiRoute = {
    // disabled: true,
    get,
    method,
    path,
    tags: ["area"],
};

export const updateCustomer: IAllRoute = {
    func,
    method,
    path,
};