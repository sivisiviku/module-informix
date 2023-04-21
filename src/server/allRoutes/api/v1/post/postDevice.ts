import { IRouterContext } from "koa-router";
import { IAllRoute, IDI, IOpenApiRoute } from "../../../../../interface";
import { BodyFormat, ValidatorGetParam } from "../../../../../lib";
import * as dayjs from "dayjs";
import { DeviceDto } from "../../../../../entity";


const path = "/v1/tcc-device";
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
            type: "string",
            required: true
        },
        device_mac: {
            type: "string",
            required: true,
            minLength: 12,
            maxLength: 12,
        },
        name: {
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
            type: "string",
            required: true
        },
    },
};


const func = async (ctx: IRouterContext): Promise<void> => {
    const di: IDI = ctx.state.di;
    console.log(di.toString(), body.toString());

    const requestBody = di.validator.processBody<{
        id: string,
        device_mac: string,
        name: string,
        description: string,
        type: string,
        area_id: string
    }>(body, ctx.request.body);
    
    const exist = di.informix.findOne("tcc_device_profile", "id", requestBody.id);
    if(exist.data) {
        ctx.status = 400;
        ctx.body = {
            message: `Device id ${requestBody.id} already exist.`
        };
        return;
    }
    const areaData: DeviceDto = {
        id: requestBody.id,
        device_mac: requestBody.name,
        device_desc: requestBody.description,
        device_type: requestBody.type,
        area_id: requestBody.area_id,
        date_created: dayjs().format("YYYY-MM-DD HH:mm:ss"),
        last_updated: dayjs().format("YYYY-MM-DD HH:mm:ss")
    }
    await di.informix.insertData("tcc_device_profile", areaData);

    ctx.status = 200;
    ctx.body = {
        message: `Device Data Added.`,
        id: requestBody.id
    }
}


export const openapiPostDevice: IOpenApiRoute = {
    // disabled: true,
    get,
    method,
    path,
    tags: ["device"],
};

export const postDevice: IAllRoute = {
    func,
    method,
    path,
};