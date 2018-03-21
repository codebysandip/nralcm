import { IAuthHandler } from "../infrastructure/IAuthHandler";
import "reflect-metadata/Reflect";
import { HttpContext } from "../infrastructure/http-context";
import { RestApiConfiguration } from "../infrastructure/rest-api.configuration";
import { UnAuthenticateException } from "../exceptions/unauthenticate.exception";
import { UnAuthorizeException } from "../exceptions/unauthorize.exception";

export class AuthHandler implements IAuthHandler {

    public handle(restApiConfiguration: RestApiConfiguration, target: any, context: HttpContext): boolean {
        const authorize = Reflect.getMetadata("authorize", target);
        if (authorize && restApiConfiguration.authenticationFilter) {
            const authResult = restApiConfiguration.authenticationFilter.authenticate(context);
            if (typeof authResult === "boolean" && !authResult) {
                if (!context.response.headersSent) {
                    new UnAuthenticateException(context);
                }
                return false;
            } else if (authResult instanceof UnAuthenticateException) {
                return false;
            }

            if (authorize.roles && authorize.roles.length > 0 && restApiConfiguration.authorizeFilter) {
                const isAuthorized = restApiConfiguration.authorizeFilter.authorize(context, authorize.roles);
                if (!isAuthorized) {
                    new UnAuthorizeException(context);
                    return false;
                }
            }
        }
        return true;
    }
}