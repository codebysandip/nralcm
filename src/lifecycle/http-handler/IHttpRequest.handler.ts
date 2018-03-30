import { HttpContext } from "..";
/**
 * Interface to implement Request Handler
 * Request Handler are the first one to recieve request
 * Usage can be to validate apiKey
 */
export interface IHttpRequestHandler {
    /**
     * Method to handle request
     * @param context HttpContext object
     */
    handle(context: HttpContext): void;
}