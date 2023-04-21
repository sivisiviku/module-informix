import * as Koa from "koa";
export async function logger(ctx: Koa.Context, next: () => Promise<any>): Promise<void> {
    const start = Date.now();
    await next();
    const ms = Date.now() - start;
    // tslint:disable-next-line:no-console
    console.log(`${ctx.method} ${ctx.url} ${ms}ms`);
}
