import { HttpContext } from "..";

/**
 * Interface for implementation of Authentication
 */
export interface IAuthenticate {
    /**
     * Method to check authentication of request
     * @param context HttpContext Object
     * @returns true or false
     */
    authenticate(context: HttpContext): boolean;
}