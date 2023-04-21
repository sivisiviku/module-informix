import * as Koa from "koa";
import { IDI } from "../interface";
import { ValidatorHeaderParam } from "../lib";
import {
    commonHeaderParams,
    ICommonHeaderParamsProcessed,
} from "../scripts";
const headerParams: ValidatorHeaderParam[] = commonHeaderParams;

export async function commonHeader(ctx: Koa.Context, next: () => Promise<any>): Promise<void> {
    const di: IDI = ctx.state.di;
    const headers = di.validator.processHeader<ICommonHeaderParamsProcessed>(headerParams, ctx.request.headers);
    ctx.set("Cache-Control", "no-store, no-cache, must-revalidate");
    ctx.set("Pragma", "no-cache");
    ctx.set("Expires", "0");
    ctx.state.contentLanguage = headers["content-language"];
    await next();
}
