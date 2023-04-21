import * as Koa from "koa";
import * as cors from "koa2-cors";
import "reflect-metadata";
import { getDiComponent } from "../di";
import {
    Config,
} from "../lib";
import { commonHeader, di, errorCatcher } from "../middleware";
import { AppRoutes } from "./appRoutes";
import "../middleware/external";
import { IRouterContext } from "koa-router";

export async function getApp(): Promise<{ app: Koa; config: Config; }> {
    const app = new Koa();
    const config = new Config();

    app.use(async (ctx, next) => {
        console.log(`[${ctx.method}] ${ctx.request.url}`);
        await next();
    });
    app.use(errorCatcher);
    app.use(di(await getDiComponent(config)));
    app.use(commonHeader);

    // @ts-ignore
    app.use(cors());

    // @ts-ignore
    app.use(async (ctx: IRouterContext, next) => {
        const customStartTime = Date.now();
        console.log("RequestBody", ctx.request.body || ctx.params);
        console.log("Headers", ctx.request.headers);
        await next();
        console.log("ResponseCode", ctx.status);
        console.log("ResponseBody", ctx.body);
        console.log(`${Date.now() - customStartTime}ms`);
    });

    const appRoutes = new AppRoutes(false);
    // @ts-ignore
    app.use(appRoutes.getRoutes());
    // it is optional though, but test got this for testing purpose
    // app.use(appRoutes.getAllowedMethods());
    return {app, config};
}
