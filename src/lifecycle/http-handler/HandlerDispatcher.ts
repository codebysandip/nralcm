import { Response, Request } from "express";
import { HttpConfiguration } from "../config";
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
            httpContext.response.type("application/json").status(400).json({ message: "There is no handler supported for the request"});
        }
    }

}