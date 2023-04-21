
import * as bodyparser from "koa-bodyparser";
import * as Router from "koa-router";
import { logger } from "../middleware";
import { baseRoutes } from "./allRoutes/api/v1";
import { uptime } from "./allRoutes/uptime";

export class AppRoutes {
    private baseRouter: Router;
    constructor(needLogger: boolean) {
        const apiV1Router = new Router({
            prefix: "/api",
        });
        const apiRouter = new Router({
            prefix: "/api",
        });
        this.baseRouter = new Router();
        this.baseRouter.get("/", uptime);
        apiRouter.get("/", uptime);
        for (const baseRoute of baseRoutes) {
            const args: any[] = [];
            if (needLogger) {
                args.push(logger);
            }

            if (baseRoute.method === "GET") {
                args.push(baseRoute.func);
                apiV1Router.get(baseRoute.path, ...args);
                if (baseRoute.tmppath) {
                    apiV1Router.get(baseRoute.tmppath, ...args);
                }
            } else if (baseRoute.method === "PUT") {
                args.push(bodyparser(), baseRoute.func);
                apiV1Router.put(baseRoute.path, ...args);
                if (baseRoute.tmppath) {
                    apiV1Router.put(baseRoute.tmppath, ...args);
                }
            } else if (baseRoute.method === "POST") {
                args.push(bodyparser(), baseRoute.func);
                apiV1Router.post(baseRoute.path, ...args);
                if (baseRoute.tmppath) {
                    apiV1Router.post(baseRoute.tmppath, ...args);
                }
            } else if (baseRoute.method === "PATCH") {
                args.push(bodyparser(), baseRoute.func);
                apiV1Router.patch(baseRoute.path, ...args);
                if (baseRoute.tmppath) {
                    apiV1Router.patch(baseRoute.tmppath, ...args);
                }
            } else if (baseRoute.method === "DELETE") {
                args.push(bodyparser(), baseRoute.func);
                apiV1Router.delete(baseRoute.path, ...args);
                if (baseRoute.tmppath) {
                    apiV1Router.delete(baseRoute.tmppath, ...args);
                }
            }
        }
        this.baseRouter.use("", apiRouter.routes());
        this.baseRouter.use("", apiV1Router.routes());
    }
    public getRoutes(): Router.IMiddleware {
        return this.baseRouter.routes();
    }
    public getAllowedMethods(): Router.IMiddleware {
        return this.baseRouter.allowedMethods();
    }
}
