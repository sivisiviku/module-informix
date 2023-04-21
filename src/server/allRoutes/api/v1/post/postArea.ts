import { IRouterContext } from "koa-router";
import { IAllRoute, IDI, IOpenApiRoute } from "../../../../../interface";
import { BodyFormat, ValidatorGetParam } from "../../../../../lib";
import * as dayjs from "dayjs";
import { AreaDto } from "../../../../../entity";


const path = "/v1/tcc-area";
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
        name: {
            type: "string",
            required: true
        },
        description: {
            type: "string",
            required: true
        },
        public: {
            type: "boolean",
            required: true
        },
        floor_id: {
            type: "number",
            required: true
        },
    },
};


const func = async (ctx: IRouterContext): Promise<void> => {
    const di: IDI = ctx.state.di;
    console.log(di.toString(), body.toString());

    const requestBody = di.validator.processBody<{
        id: string,
        name: string,
        description: string,
        public: boolean,
        floor_id: string
    }>(body, ctx.request.body);
    
    const exist = di.informix.findOne("tcc_area", "id", requestBody.id);
    if(exist.data) {
        ctx.status = 400;
        ctx.body = {
            message: `Area id ${requestBody.id} already exist.`
        };
        return;
    }
    const areaData: AreaDto = {
        id: requestBody.id,
        name: requestBody.name,
        description: requestBody.description,
        public: requestBody.public ? "t" : "f",
        floor_id: requestBody.floor_id,
        date_created: dayjs().format("YYYY-MM-DD HH:mm:ss"),
        last_updated: dayjs().format("YYYY-MM-DD HH:mm:ss")
    }
    await di.informix.insertData("tcc_area", areaData);

    ctx.status = 200;
    ctx.body = {
        message: `Area Data Added.`,
        id: requestBody.id
    }
}


export const openapiPostArea: IOpenApiRoute = {
    // disabled: true,
    get,
    method,
    path,
    tags: ["area"],
};

export const postArea: IAllRoute = {
    func,
    method,
    path,
};