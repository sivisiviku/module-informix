import { getApp } from "./app";
import * as http from "http";

(async () => {
    try {
        process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
        const { app, config } = await getApp();

        const server =
        http.createServer(app.callback())
            .listen(config.port);

        server.timeout = 300000;
        server.keepAliveTimeout = 300000;
        console.log(`Server running on port ${config.port}`);
    } catch (err) {
        console.log(err);
        process.exit(1);
    }
})();
