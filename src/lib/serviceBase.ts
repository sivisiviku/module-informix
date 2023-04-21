import fetch from "node-fetch";

export default class ServiceBase {
    protected baseUrl: string;

    protected async sendRequest(path: string, method: string, data: any): Promise<void> {
        try {
            const url = `${this.baseUrl.replace(/\/+$/g, "")}/${path.replace(/^\//g, "")}`;
            const request =
                await fetch(url, {
                    ...data,
                    method,
                });

            return await request.json();
        } catch (error) {
            throw new Error(error);
        }
    }
}