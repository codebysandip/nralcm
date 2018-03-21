import { IHttpHandler } from "./IHttpHandler";
import { Response, Request } from "express";
import { HttpConfiguration } from "./http-configuration";

export class HandlerDispatcher {
    private static handlerDispatcher: HandlerDispatcher;

    private constructor() {

    }


    public processHandler(request: Request, response: Response, httpConfiguration: HttpConfiguration) {
        const matchedHandler = httpConfiguration.getHandler(request.url);
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