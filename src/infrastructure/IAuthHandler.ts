import { HttpContext } from "./http-context";

/**
 * Implement this interface for authentication
 * and authorization
 */
export interface IAuthHandler {
    handle(context: HttpContext): boolean;
}