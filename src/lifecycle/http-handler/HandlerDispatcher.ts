import { Response, Request } from "express";
import { HttpConfiguration } from "../config";
import { HandlerNotFoundException } from "../../exceptions";
import { getContext } from "../../common";

export class HandlerDispatcher {
    private static handlerDispatcher: HandlerDispatcher;

    private constructor() {
    }

    public processHandler(request: Request, response: Response) {
        const matchedHandler = HttpConfiguration.getHandler(request.url);
        if (matchedHandler && matchedHandler[1]) {
            matchedHandler[1].processRequest(request, response);
        } else {
            throw new HandlerNotFoundException(getContext(request, response));
        }
    }

    public static getInstance() {
        if (!this.handlerDispatcher) {
            this.handlerDispatcher = new HandlerDispatcher();
        }
        return this.handlerDispatcher;
    }
}