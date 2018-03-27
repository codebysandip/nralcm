import { HttpContext } from "..";

/**
 * Implement this interface for authentication
 * and authorization
 */
export interface IAuthHandler {
    /**
     * Method to process authentication
     * and authorization
     * @param context HttpContext Object
     */
    handle(context: HttpContext): boolean;
}