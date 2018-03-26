import { IHttpHandler } from "../http-handler";

export class HttpConfiguration {
    private static handlers: [string, IHttpHandler][] = [];

    public static addHandler(url: string, handler: IHttpHandler) {
        this.handlers.push([url, handler]);
    }

    public static getHandler(url: string) {
        return this.handlers.find(handler => url.match(handler[0]) ? true : false);
    }
}