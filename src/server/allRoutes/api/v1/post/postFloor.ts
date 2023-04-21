import { IRouterContext } from "koa-router";
import { IAllRoute, IDI, IOpenApiRoute } from "../../../../../interface";
import { BodyFormat, ValidatorGetParam } from "../../../../../lib";
import * as dayjs from "dayjs";
import { FloorDto } from "../../../../../entity/floor";


const path = "/v1/tcc-floor";
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
        public: {
            type: "boolean",
            required: true
        },
        qa_id: {
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
        public: boolean,
        qa_id: number
    }>(body, ctx.request.body);
    
    const exist = di.informix.findOne("tcc_floor", "id", requestBody.id);
    if(exist.data) {
        ctx.status = 400;
        ctx.body = {
            message: `Floor id ${requestBody.id} already exist.`
        };
        return;
    }
    const floorData: FloorDto = {
        id: requestBody.id,
        name: requestBody.name,
        public: requestBody.public ? "t" : "f",
        qa_id: requestBody.qa_id,
        date_created: dayjs().format("YYYY-MM-DD HH:mm:ss"),
        last_updated: dayjs().format("YYYY-MM-DD HH:mm:ss")
    }
    await di.informix.insertData("tcc_floor", floorData);

    ctx.status = 200;
    ctx.body = {
        message: `Floor Data Added.`,
        id: requestBody.id
    }
}


export const openapiPostFloor: IOpenApiRoute = {
    // disabled: true,
    get,
    method,
    path,
    tags: ["floor"],
};

export const postFloor: IAllRoute = {
    func,
    method,
    path,
};