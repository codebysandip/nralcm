import { IHttpHandler } from "./IHttpHandler";
import { Response, Request } from "express";


export class HandlerDispatcher {
    private static handlerDispatcher: HandlerDispatcher;
    private handlers: [string, IHttpHandler][] = [];

    private constructor() {

    }

    public add(url: string,  handler: IHttpHandler) {
        this.handlers.push([url, handler]);
    }

    public processHandler(request: Request, response: Response) {
        const matchedHandler = this.handlers.find(handler =>  {
            return request.url.match(handler[0]) ? true : false;
        });
        if (matchedHandler && matchedHandler[1]) {
            matchedHandler[1].processRequest(request, response);
        } else {
            // return not found
        }
    }

    public static getInstance() {
        if (!this.handlerDispatcher) {
            this.handlerDispatcher = new HandlerDispatcher();
        }
        return this.handlerDispatcher;
    }
}