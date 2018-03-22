import { IAuthHandler } from "../infrastructure/IAuthHandler";
import "reflect-metadata/Reflect";
import { HttpContext } from "../infrastructure/http-context";
import { UnAuthenticateException } from "../exceptions/unauthenticate.exception";
import { UnAuthorizeException } from "../exceptions/unauthorize.exception";
import { RestApiConfiguration } from "../infrastructure/rest-api.configuration";

/**
 * Auth Handler to process authentication
 * and authorization
 */
export class AuthHandler implements IAuthHandler {
    private restApiConfiguration = RestApiConfiguration.getInstance();

    public handle(context: HttpContext): boolean {
        const authorize = Reflect.getMetadata("authorize", context.controller);
        if (authorize && this.restApiConfiguration.getAuthenticationFilter()) {
            const authResult = this.restApiConfiguration.getAuthenticationFilter().authenticate(context);
            if (!authResult) {
                if (!context.response.headersSent) {
                    throw new UnAuthenticateException(context);
                }
            } else {
                context.isAuthenticated = true;
                if (authorize.roles && authorize.roles.length > 0 && this.restApiConfiguration.getAuthorizeFilter()) {
                    const isAuthorized = this.restApiConfiguration.getAuthorizeFilter().authorize(context, authorize.roles);
                    if (!isAuthorized) {
                        throw new UnAuthorizeException(context);
                    }
                }
            }
        }
        return true;
    }
}