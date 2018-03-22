import { IHttpHandler } from "../infrastructure/IHttpHandler";
import { HttpContext } from "../infrastructure/http-context";
import "reflect-metadata/Reflect";
import { RestApiConfig } from "../rest-api.config";
import { RestApiConfiguration } from "../infrastructure/rest-api.configuration";
import { getContext } from "../common/get-context";
import { Request, Response } from "express-serve-static-core";
import { ControllerMapper } from "../infrastructure/controller-mapper";
import { IRoute } from "../infrastructure/route";
import { ApiMethodMapper } from "../infrastructure/api-method-mapper";
import { UnAuthenticateException } from "../exceptions/unauthenticate.exception";
import { BadRequestException } from "../exceptions/bad-request.exception";
import { DependencyInjection } from "../infrastructure/dependency-injection";
import { Constants } from "../infrastructure/rest-api-constants";
import { ServerResponse } from "http";

export class RestApiHandler implements IHttpHandler {
    private config: RestApiConfig;
    private restApiConfiguration = RestApiConfiguration.getInstance();

    constructor() {
        this.config = new RestApiConfig();
        this.config.register(this.restApiConfiguration);
    }

    public processRequest(req: Request, res: Response): void {
        const context: HttpContext = getContext(req, res);
        try {
            const route: IRoute = ControllerMapper(context);
            if (route) {
                context.controller = route.controller;
                context.controllerObject = new route.controller();
            }

            const routeDescriptor = ApiMethodMapper(context);

            if (this.restApiConfiguration.getAuthHandler()) {
                const authResult = this.restApiConfiguration.getAuthHandler().handle(context);
                if (!authResult) {
                    throw new UnAuthenticateException(context);
                }
            }

            if (this.restApiConfiguration.getModelValidationHandler()) {
                const modelValidationHandlerResult = this.restApiConfiguration.getModelValidationHandler().validate(context, routeDescriptor);
                if (modelValidationHandlerResult.length) {
                    throw new BadRequestException(context, modelValidationHandlerResult);
                }
            }

            // Resolve Dependency of Controller
            new DependencyInjection(context);
            const args = Reflect.getMetadata(Constants.metadata.args, context.controllerObject) as any[];
            const method = routeDescriptor.descriptor.value;
            const data = method.apply(context.controllerObject as Object, args);
            if (!(data instanceof ServerResponse)) {
                context.response.json(data);
            }
            return;
    } catch (e) {
            if (this.restApiConfiguration.getExceptionHandler() && !context.response.headersSent) {
                this.restApiConfiguration.getExceptionHandler().handleException(context, e);
            }
        }
    }

}
