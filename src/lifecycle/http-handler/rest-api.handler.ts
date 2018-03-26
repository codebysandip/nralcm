import { IHttpHandler } from "./IHttpHandler";
import { HttpContext } from "../http-context";
import "reflect-metadata/Reflect";
import { RestApiConfiguration } from "../config";
import { getContext } from "../../common/functions";
import { Request, Response } from "express-serve-static-core";
import { ControllerMapper } from "../route-mapping";
import { ApiMethodMapper } from "../route-mapping";
import { DependencyInjection } from "../dependency-resolver";
import { Constants } from "../rest-api-constants";
import { ServerResponse } from "http";
import { FilterExecuter } from "../filter";
import { UnAuthenticateException, BadRequestException } from "../../exceptions";
import { IRoute } from "../../common";


/**
 * Handler for rest api
 */
export class RestApiHandler implements IHttpHandler {

    constructor() {
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
            if (RestApiConfiguration.HttpRequestHandler) {
                RestApiConfiguration.HttpRequestHandler.handle(context);

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
            if (RestApiConfiguration.AuthHandler) {
                const authResult = RestApiConfiguration.AuthHandler.handle(context);
                if (!authResult) {
                    throw new UnAuthenticateException(context);
                }
            }

            // validating request body, params and query string
            if (RestApiConfiguration.ModelValidationHandler) {
                const modelValidationHandlerResult = RestApiConfiguration.ModelValidationHandler.validate(context, routeDescriptor);
                if (modelValidationHandlerResult.length && !context.response.headersSent) {
                    throw new BadRequestException(context, modelValidationHandlerResult);
                }
            }

            // custom filters execution
            const filterExecuter = new FilterExecuter(context, routeDescriptor);
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
            if (RestApiConfiguration.ExceptionHandler && !context.response.headersSent) {
                RestApiConfiguration.ExceptionHandler.handleException(context, e);
            }
        }
    }
}
