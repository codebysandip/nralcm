import { IHttpHandler } from "../infrastructure/IHttpHandler";
import { HttpContext } from "../infrastructure/http-request";
import { HttpResponse } from "../infrastructure/http-response";
import { IRoute } from "../infrastructure/route";
import { routes } from "../app.routes";
import "reflect-metadata/Reflect";
import { ProductController } from "../controllers/product.controller";
import { RouteDescriptor } from "../infrastructure/route-descriptor";
import { IAuthentication } from "../infrastructure/IAuthentication";
import { AuthenticationFilter } from "../filters/authentication.filter";
import { IAuthorize } from "../infrastructure/IAuthorize";
import { AuthorizationFilter } from "../filters/authorize.filter";
import { DependencyInjection } from "../infrastructure/dependency-injection";
import { Request } from "express-serve-static-core";
import { Response } from "express-serve-static-core";
import { RestApiConfig } from "../rest-api.config";
import { RestApiConfiguration } from "../infrastructure/rest-api.configuration";
import { UnAuthenticateException } from "../exceptions/unauthenticate.exception";
import { UnAuthorizeException } from "../exceptions/unauthorize.exception";
import { NotFoundException } from "../exceptions/not-found.exception";

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
        const context: HttpContext = this.getContext(req, res);
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
                // const instance = new route.controller();
                // const url = urlParts.slice(1).join("/");

                // const routeDescriptors: RouteDescriptor[] = Reflect.getMetadata("routes", instance);
                // if (routeDescriptors) {
                //     const routeDescriptor = routeDescriptors.find(routeDescriptor => routeDescriptor.route === url);

                //     if (routeDescriptor && routeDescriptor.descriptor) {
                //         const constructorParameterTypes: any[] = Reflect.getMetadata("design:paramtypes", routeDescriptor.descriptor.value);
                //         console.log("constructorParameterTypes", Reflect.getMetadataKeys(routeDescriptor.descriptor.value));
                //         // const formatMetadataKey = Symbol("Required");

                //         // console.log("ssd", Reflect.getMetadata(formatMetadataKey, instance, "productName"));

                //         this.dependencyInjection = new DependencyInjection(route.controller, instance, req, res);
                //         const method = routeDescriptor.descriptor.value;
                //         method.apply(instance);
                //         return;
                //     }
                // }
            }
            console.log("not found");
            new NotFoundException(context);
            return;
        } catch (e) {
            if (this.restApiConfiguration.exceptionHandler) {
                this.restApiConfiguration.exceptionHandler.handleException(context, e);
            }
        }
    }

    private getUrlParts(url: string) {
        url = url.substring(url.indexOf("api") + 3);
        url = url.startsWith("/") ? url.substring(1) : url;
        return url ? url.split("/") : [];
    }

    private getContext(req: Request, res: Response) {
        const httpContext: HttpContext = {
            isAuthenticated: false,
            request: req,
            response: res
        };
        return httpContext;
    }
}
