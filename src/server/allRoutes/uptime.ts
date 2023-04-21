import { IRouterContext } from "koa-router";

export const uptime = async (ctx: IRouterContext): Promise<void> => {
    ctx.body = {
        uptime: process.uptime(),
    };
};
