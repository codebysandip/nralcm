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
    private restApiConfiguration: RestApiConfiguration;

    public handle(context: HttpContext, restApiConfiguration: RestApiConfiguration): boolean {
        this.restApiConfiguration = restApiConfiguration;
        const authorize = Reflect.getMetadata("authorize", context.controller);
        if (authorize && this.restApiConfiguration.AuthenticationFilter) {
            const authResult = this.restApiConfiguration.AuthenticationFilter.authenticate(context);
            if (!authResult) {
                if (!context.response.headersSent) {
                    throw new UnAuthenticateException(context);
                }
            } else {
                if (authorize.roles && authorize.roles.length > 0 && this.restApiConfiguration.AuthorizeFilter) {
                    if (context.user && context.user.isAuthenticated) {
                        const isAuthorized = this.restApiConfiguration.AuthorizeFilter.authorize(context, authorize.roles);
                        if (!isAuthorized && !context.response.headersSent) {
                            throw new UnAuthorizeException(context);
                        }
                    } else {
                        context.response.type("application/json").status(500).send({ message: "HttpContext.user is null. Create a new class and extend AuthPrinciple. Inject object of class in HttpContext.user."});
                    }
                }
            }
        }
        return true;
    }
}