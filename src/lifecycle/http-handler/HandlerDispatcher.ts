import { Response, Request } from "express";
import { HttpConfiguration } from "../config";
import { HandlerNotFoundException } from "../../exceptions";
import { getContext } from "../../common";

/**
 * HandlerDispatcher class dispatches handler for request.
 */
export class HandlerDispatcher {

    /**
     * Method to process handler
     * This method process handler that registered in HttpConfiguration
     * @param request Request Object
     * @param response Response Object
     */
    public static processHandler(request: Request, response: Response): void {
        const matchedHandler = HttpConfiguration.getHandler(request.url);
        if (matchedHandler && matchedHandler[1]) {
            matchedHandler[1].processRequest(request, response);
        } else {
            throw new HandlerNotFoundException(getContext(request, response));
        }
    }

}