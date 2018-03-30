import { Response } from "express-serve-static-core";
import { HttpContext, HttpResponseMessage } from "..";

/**
 * Interface to Response handler.
 * Response handler gets HttpContext Object to process response at last stage.
 * Usage of IHttpResponseHandler can be alter response
 */
export interface IHttpResponseHandler {
    /**
     * Method to send response
     * @param context HttpContext Object
     * @param httpResponseMessage HttpResponseMessage Object
     */
    sendResponse<T>(context: HttpContext, httpResponseMessage: HttpResponseMessage<T>): Response;
}