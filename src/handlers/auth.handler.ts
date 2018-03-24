import { IAuthHandler } from "../infrastructure/IAuthHandler";
import "reflect-metadata/Reflect";
import { HttpContext } from "../infrastructure/http-context";
import { RestApiConfiguration } from "../infrastructure/rest-api.configuration";
import { nrlcm } from "../infrastructure/exception";
import { Constants } from "../infrastructure/rest-api-constants";

/**
 * Auth Handler to process authentication
 * and authorization
 */
export class AuthHandler implements IAuthHandler {
    private restApiConfiguration: RestApiConfiguration;

    public handle(context: HttpContext, restApiConfiguration: RestApiConfiguration): boolean {
        this.restApiConfiguration = restApiConfiguration;
        let authorize = Reflect.getMetadata(Constants.metadata.authorize, context.controller);

        if (!authorize) {
            authorize = Reflect.getMetadata(Constants.metadata.authorize, context.controller, context.routeDescriptor.propertyKey);
        }
        if (authorize && this.restApiConfiguration.AuthenticationFilter) {
            const authResult = this.restApiConfiguration.AuthenticationFilter.authenticate(context);
            if (!authResult) {
                if (!context.response.headersSent) {
                    throw new nrlcm.Exception.UnAuthenticateException(context);
                }
            } else {
                if (authorize.roles && authorize.roles.length > 0 && this.restApiConfiguration.AuthorizeFilter) {
                    if (context.user && context.user.isAuthenticated) {
                        const isAuthorized = this.restApiConfiguration.AuthorizeFilter.authorize(context, authorize.roles);
                        if (!isAuthorized && !context.response.headersSent) {
                            throw new nrlcm.Exception.UnAuthorizeException(context);
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