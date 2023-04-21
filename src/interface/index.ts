import { Request } from "koa";
import { IMiddleware, IRouterContext } from "koa-router";
import { PartialResponsify, ResponseFormat } from "partial-responsify";
import {
    BodyFormat,
    Config,
    Helper,
    Informix,
    Validator,
    ValidatorGetParam,
    ValidatorHeaderParam,
    ValidatorPathParam,
} from "../lib";


export interface IDI {
    config: Config;
    helper: Helper;
    informix: Informix;
    partialResponsify: PartialResponsify;
    validator: Validator;
}
export interface IOpenApiRoute {
    bodyFormat?: BodyFormat;
    description?: string;
    path: string;
    headerParams?: ValidatorHeaderParam[];
    pathParams?: ValidatorPathParam[];
    method: "GET" | "POST" | "PUT" | "PATCH" | "DELETE";
    get?: ValidatorGetParam[];
    tags?: string[];
    successResponseFormat?: ResponseFormat;
}
export interface IAllRoute {
    path: string;
    tmppath?: string;
    method: "GET" | "POST" | "PUT" | "PATCH" | "DELETE";
    func: IMiddleware;
}
export interface IKoaRequestWithBody extends IRouterContext {
    request: IKoaBodyParserRequest;
}

export interface IKoaBodyParserRequest extends Request {
    body: any;
    app: any;
    req: any;
    res: any;
    ctx: any;
    response: any;
    originalUrl: any;
    ip: any;
    accept: any;
    charset: any;
    length: any;
    type: any;
    inspect: any;
    toJSON: any;
    header: any;
    headers: any;
    url: any;
    origin: any;
    path: any;
    href: any;
    method: any;
    query: any;
    querystring: any;
    search: any;
    host: any;
    hostname: any;
    URL: any;
    fresh: any;
    stale: any;
    idempotent: any;
    socket: any;
    protocol: any;
    secure: any;
    ips: any;
    subdomains: any;
    accepts: any;
    acceptsEncodings: any;
    acceptsCharsets: any;
    acceptsLanguages: any;
    is: any;
    get: any;
    rawBody: any;
}
