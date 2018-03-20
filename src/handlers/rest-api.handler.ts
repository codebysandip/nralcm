import { IHttpHandler } from "../infrastructure/IHttpHandler";
import { HttpContext } from "../infrastructure/http-request";
import { HttpResponse } from "../infrastructure/http-response";
import { IRoute } from "../infrastructure/route";
import { routes } from "../app.routes";
import "reflect-metadata/Reflect";
import { RouteDescriptor } from "../infrastructure/route-descriptor";
import { IAuthentication } from "../infrastructure/IAuthentication";
import { AuthenticationFilter } from "../filters/authentication.filter";
import { IAuthorize } from "../infrastructure/IAuthorize";
import { AuthorizationFilter } from "../filters/authorize.filter";
import { DependencyInjection } from "../infrastructure/dependency-injection";
import { RestApiConfig } from "../rest-api.config";
import { RestApiConfiguration } from "../infrastructure/rest-api.configuration";
import { UnAuthenticateException } from "../exceptions/unauthenticate.exception";
import { UnAuthorizeException } from "../exceptions/unauthorize.exception";
import { NotFoundException } from "../exceptions/not-found.exception";
import { getContext } from "../common/get-context";
import { Request, Response } from "express-serve-static-core";

export class RestApiHandler implements IHttpHandler {
    private routes: IRoute[] = routes;
    private dependencyInjection: DependencyInjection;
    private config: RestApiConfig;
    private restApiConfiguration = new RestApiConfiguration();

    constructor() {
        this.config = new RestApiConfig();
        this.config.register(this.restApiConfiguration);
    }

    public processRequest(req: Request, res: Response): void {
        const context: HttpContext = getContext(req, res);
        try {
            const urlParts = this.getUrlParts(req.url);
            const route = this.routes.find(route => urlParts[0] == route.path);

            if (route && urlParts.length > 1) {
                context.controller = route.controller;
                context.controllerObject = new route.controller();
                if (this.restApiConfiguration.authHandler) {
                    const authResult = this.restApiConfiguration.authHandler.handle(this.restApiConfiguration, route.controller, context);
                    if (!authResult) {
                        return;
                    }
                }

                if (this.restApiConfiguration.modelValidationHandler) {
                    const modelValidationHandlerResult = this.restApiConfiguration.modelValidationHandler.validate(context);
                    if (!modelValidationHandlerResult) {
                        return;
                    }
                    return;
                }
            }
            console.log("not found");
            throw new NotFoundException(context);
        } catch (e) {
            if (this.restApiConfiguration.exceptionHandler && !context.response.headersSent) {
                this.restApiConfiguration.exceptionHandler.handleException(context, e);
            }
        }
    }

    private getUrlParts(url: string) {
        url = url.substring(url.indexOf("api") + 3);
        url = url.startsWith("/") ? url.substring(1) : url;
        return url ? url.split("/") : [];
    }

}
