import { IHttpHandler } from "./IHttpHandler";
export class HttpConfiguration {
    private handlers: [string, IHttpHandler][] = [];

    public addHandler(url: string, handler: IHttpHandler) {
        this.handlers.push([url, handler]);
    }

    public getHandler(url: string) {
        return this.handlers.find(handler => url.match(handler[0]) ? true : false);
    }
}