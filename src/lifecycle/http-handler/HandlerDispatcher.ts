import { Response, Request } from "express";
import { HttpConfiguration } from "../config";
import { HandlerNotFoundException } from "../../exceptions";
import { getContext } from "../../common";
import { HttpContext } from "..";

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
    public static processHandler(request: Request, response: Response, httpConfiguration: HttpConfiguration, context?: HttpContext): void {
        const matchedHandler = httpConfiguration.getHandler(request.url);
        if (matchedHandler && matchedHandler[1]) {
            matchedHandler[1].processRequest(request, response);
        } else {
            let httpContext: HttpContext;
            if (context) {
                httpContext = context;
            } else {
                httpContext = getContext(request, response);
            }
            throw new HandlerNotFoundException(httpContext);
        }
    }

}