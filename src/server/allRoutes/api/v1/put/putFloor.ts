import * as dayjs from "dayjs";
import { IRouterContext } from "koa-router";
import { FloorDto } from "../../../../../entity/floor";
import { IAllRoute, IDI, IOpenApiRoute } from "../../../../../interface";
import { BodyFormat, ValidatorGetParam, ValidatorPathParam } from "../../../../../lib";

const path = "/v1/tcc-floor/:id";
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
    
    // Validate query params
    di.validator.processQuery(get, ctx.request.query);
    const params = di.validator.processPath<{ id: string }>(pathParams, ctx.params);
    const requestBody = di.validator.processBody<{
        name: string,
        public: boolean,
        qa_id: number
    }>(body, ctx.request.body);
    
    const exist = di.informix.findOne("tcc_floor", "id", params.id);

    if(exist.error) {
        ctx.status = exist.status;
        ctx.body = {
            message: exist.message,
        }
        return;
    }
    const updateData: FloorDto = {
        id: params.id,
        name: requestBody.name,
        public: requestBody.public ? "t" : "f",
        qa_id: requestBody.qa_id,
        last_updated: dayjs().format("YYYY-MM-DD HH:mm:ss")
    }
    const updateRecord: any = await di.informix.updateByColumn("tcc_floor", updateData, "id", params.id);
    ctx.status = updateRecord.status,
    ctx.body = {
        message: updateRecord.message,
        data: di.informix.findOne("tcc_floor", "id", params.id).data
    }
}


export const openapiUpdateFloor: IOpenApiRoute = {
    // disabled: true,
    get,
    method,
    path,
    tags: ["floor"],
};

export const updateFloor: IAllRoute = {
    func,
    method,
    path,
};