import * as dayjs from "dayjs";
import { IRouterContext } from "koa-router";
import { AreaDto } from "../../../../../entity";
import { IAllRoute, IDI, IOpenApiRoute } from "../../../../../interface";
import { BodyFormat, ValidatorGetParam, ValidatorPathParam } from "../../../../../lib";

const path = "/v1/tcc-device/:id";
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
        name: {
            type: "string",
            required: true
        },
        device_mac: {
            type: "string",
            required: true
        },
        description: {
            type: "string",
            required: true
        },
        type: {
            type: "string",
            required: true
        },
        area_id: {
            type: "number",
            required: true
        },
    },
};


const func = async (ctx: IRouterContext): Promise<void> => {
    const di: IDI = ctx.state.di;
    
    // Validate query params
    di.validator.processQuery(get, ctx.request.query);
    const params = di.validator.processPath<{ id: string }>(pathParams, ctx.params);
    const requestBody = di.validator.processBody<{
        name: string,
        description: string,
        public: boolean,
        floor_id: string
    }>(body, ctx.request.body);
    
    const exist = di.informix.findOne("tcc_device_profile", "id", params.id);

    if(exist.error) {
        ctx.status = exist.status;
        ctx.body = {
            message: exist.message,
        }
        return;
    }
    const updateData: AreaDto = {
        id: params.id,
        name: requestBody.name,
        description: requestBody.name,
        public: requestBody.public ? "t" : "f",
        floor_id: requestBody.floor_id,
        last_updated: dayjs().format("YYYY-MM-DD HH:mm:ss")
    }
    const updateRecord: any = await di.informix.updateByColumn("tcc_device_profile", updateData, "id", params.id);
    ctx.status = updateRecord.status,
    ctx.body = {
        message: updateRecord.message,
        data: di.informix.findOne("tcc_device_profile", "id", params.id).data
    }
}


export const openapiUpdateDevice: IOpenApiRoute = {
    // disabled: true,
    get,
    method,
    path,
    tags: ["device"],
};

export const updateDevice: IAllRoute = {
    func,
    method,
    path,
};