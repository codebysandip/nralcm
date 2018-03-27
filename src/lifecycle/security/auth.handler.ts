import { IAuthHandler } from "../security";
import "reflect-metadata/Reflect";
import { HttpContext } from "..";
import { RestApiConfiguration } from "../config";
import { UnAuthenticateException, UnAuthorizeException } from "../../exceptions";

import { Constants } from "..";

/**
 * Handler to process authentication
 * and authorization
 */
export class AuthHandler implements IAuthHandler {

    /**
     * Method to process authentication
     * and authorization
     * @param context HttpContext Object
     */
    public handle(context: HttpContext): boolean {
        let authorize = Reflect.getMetadata(Constants.metadata.authorize, context.controller);

        if (!authorize) {
            authorize = Reflect.getMetadata(Constants.metadata.authorize, context.controller, context.routeDescriptor.methodName);
        }
        if (authorize && RestApiConfiguration.AuthenticationFilter) {
            const authResult = RestApiConfiguration.AuthenticationFilter.authenticate(context);
            if (!authResult) {
                if (!context.response.headersSent) {
                    throw new UnAuthenticateException(context);
                }
            } else {
                if (authorize.roles && authorize.roles.length > 0 && RestApiConfiguration.AuthorizeFilter) {
                    if (context.user && context.user.isAuthenticated) {
                        const isAuthorized = RestApiConfiguration.AuthorizeFilter.authorize(context, authorize.roles);
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