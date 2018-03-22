import { HttpContext } from "./http-context";
import { RestApiConfiguration } from "./rest-api.configuration";

/**
 * Implement this interface for authentication
 * and authorization
 */
export interface IAuthHandler {
    handle(context: HttpContext, restApiConfiguration: RestApiConfiguration): boolean;
}