import * as dayjs from "dayjs";
import { IRouterContext } from "koa-router";
import { IAllRoute, IDI, IOpenApiRoute } from "../../../../../interface";
import { BodyFormat, ValidatorGetParam, ValidatorPathParam } from "../../../../../lib";

const path = "/v1/tcc-floor/:id";
const method = "DELETE";
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


const func = async (ctx: IRouterContext): Promise<void> => {
    const di: IDI = ctx.state.di;
    
    // Validate query params
    di.validator.processQuery(get, ctx.request.query);
    
    const params = di.validator.processPath<{ id: string }>(pathParams, ctx.params);
    
    const exist = di.informix.findOne("tcc_floor", "id", params.id);

    if(exist.error) {
        ctx.status = exist.status;
        ctx.body = {
            message: exist.message,
        }
        return;
    }
    
    const deleteRecord = await di.informix.deleteData("tcc_floor", "id", params.id);
    ctx.status = deleteRecord.status,
    ctx.body = {
        message: deleteRecord.message
    }
}


export const openapiDeleteFloor: IOpenApiRoute = {
    // disabled: true,
    get,
    method,
    path,
    tags: ["floor"],
};

export const deleteFloor: IAllRoute = {
    func,
    method,
    path,
};