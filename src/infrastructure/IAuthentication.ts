import { HttpContext } from "./http-context";

/**
 * Interface for implementation of Authentication
 */
export interface IAuthentication {
    /**
     * Method for check authentication of request
     * @param context HttpContext Object
     * @returns true or false
     */
    authenticate(context: HttpContext): boolean;
}