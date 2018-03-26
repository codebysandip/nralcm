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
import { DependencyInjection } from "../infrastructure/dependency-injection";
import { Constants } from "../infrastructure/rest-api-constants";
import { ServerResponse } from "http";
import { FilterExecuter } from "../infrastructure/filter-executer";
import { nrlcm } from "../infrastructure/exception";

/**
 * Handler for rest api
 */
export class RestApiHandler implements IHttpHandler {
    private config: RestApiConfig;
    private restApiConfiguration = RestApiConfiguration.getInstance();

    constructor() {
        this.config = new RestApiConfig();
        this.config.register(this.restApiConfiguration);
    }

    /**
     * Process request of rest api
     * @param req Request object
     * @param res Response object
     */
    public processRequest(req: Request, res: Response): void {
        const context: HttpContext = getContext(req, res);
        try {
            // passing HttpContext to HttpRequestHandler
            if (this.restApiConfiguration.HttpRequestHandler) {
                this.restApiConfiguration.HttpRequestHandler.handle(context);

                // checking that request sent from HttpRequestHandler. If sent return from here
                if (context.response.headersSent) {
                    return;
                }
            }

            // Mapping request with controller
            const route: IRoute = ControllerMapper(context);
            if (route) {
                // injecting controller and controller object in HttpContext object
                context.controller = route.controller;
                context.controllerObject = new route.controller();
            }

            // Mapping request with api method
            const routeDescriptor = ApiMethodMapper(context);
            context.routeDescriptor = routeDescriptor;

            // sending request to Auth handler
            if (this.restApiConfiguration.AuthHandler) {
                const authResult = this.restApiConfiguration.AuthHandler.handle(context, this.restApiConfiguration);
                if (!authResult) {
                    throw new nrlcm.Exception.UnAuthenticateException(context);
                }
            }

            // validating request body, params and query string
            if (this.restApiConfiguration.ModelValidationHandler) {
                const modelValidationHandlerResult = this.restApiConfiguration.ModelValidationHandler.validate(context, routeDescriptor);
                if (modelValidationHandlerResult.length && !context.response.headersSent) {
                    throw new nrlcm.Exception.BadRequestException(context, modelValidationHandlerResult);
                }
            }

            // custom filters execution
            const filterExecuter = new FilterExecuter(this.restApiConfiguration, context, routeDescriptor);
            filterExecuter.executeBeforeActionExceduted();

            // Resolve Dependency of Controller
            DependencyInjection.inject(context);

            // get arugments array to call api method
            const args = Reflect.getMetadata(Constants.metadata.args, context.controllerObject) as any[];

            const method = routeDescriptor.descriptor.value;
            const data = method.apply(context.controllerObject as Object, args);
            if (!(data instanceof ServerResponse) || !context.response.headersSent) {
                filterExecuter.executeAfterActionExceduted();
                context.response.json(data);
            }
            return;
        } catch (e) {
            if (this.restApiConfiguration.ExceptionHandler && !context.response.headersSent) {
                this.restApiConfiguration.ExceptionHandler.handleException(context, e);
            }
        }
    }
}
