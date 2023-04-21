import * as Koa from "koa";
import { IDI } from "../interface";

export const di = (theDi: IDI) => async (ctx: Koa.Context, next: () => Promise<any>): Promise<void> => {
    ctx.state.di = theDi;
    await next();
};
