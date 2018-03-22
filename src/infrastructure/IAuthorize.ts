import { HttpContext } from "./http-context";

/**
 * Interface for implementation of Authorization
 */
export interface IAuthorize {
    /**
     * Method for check authorization of request
     * @param context HttpContext Object
     * @param roles Roles for access of api
     */
    authorize(context: HttpContext, roles: string[]): boolean;
}