import * as Koa from "koa";
import * as koaHelmet from "koa-helmet";
import "reflect-metadata";
import {
    Config,
} from "../src/lib";
import { commonHeader, di, errorCatcher, logger } from "../src/middleware";
import { AppRoutes } from "../src/server/appRoutes";
import { getDiComponent } from "./di";

export async function getTestApp() {
    const app = new Koa();
    const config = new Config();
    app.use(koaHelmet());
    app.use(errorCatcher);
    app.use(di(await getDiComponent(config)));
    app.use(commonHeader);
    // if (config.logger) {
    //     app.use(logger);
    // }
    const appRoutes = new AppRoutes(config.logger);
    app.use(appRoutes.getRoutes());
    app.use(appRoutes.getAllowedMethods());
    return app;
}
