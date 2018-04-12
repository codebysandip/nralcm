import { IHttpHandler } from "./IHttpHandler";
import { HttpContext, DefaultHttpResponseHandler, ExceptionHandler, AuthHandler, ModelValidationHandler } from "..";
import "reflect-metadata/Reflect";
import { RestApiConfiguration } from "../config";
import { getContext, getHttpResponse } from "../../common/functions";
import { Request, Response } from "express-serve-static-core";
import { ControllerMapper } from "../route-mapping";
import { ApiMethodMapper } from "../route-mapping";
import { DependencyInjection } from "../dependency-resolver";
import { Constants } from "..";
import { FilterExecuter } from "../filter";
import { UnAuthenticateException, BadRequestException } from "../../exceptions";
import { IRoute } from "../../common";



/**
 * Handler for rest api
 */
export class RestApiHandler implements IHttpHandler {

    constructor(private restApiConfiguration: RestApiConfiguration) {
        if (!this.restApiConfiguration.HttpResponseHandler) {
            this.restApiConfiguration.HttpResponseHandler = new DefaultHttpResponseHandler();
        }

        if (!this.restApiConfiguration.ExceptionHandler) {
            this.restApiConfiguration.ExceptionHandler = new ExceptionHandler();
        }

        if (!this.restApiConfiguration.AuthHandler) {
            this.restApiConfiguration.AuthHandler = new AuthHandler(this.restApiConfiguration);
        }

        if (!this.restApiConfiguration.ModelValidationHandler) {
            this.restApiConfiguration.ModelValidationHandler = new ModelValidationHandler();
        }
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
            const route: IRoute = ControllerMapper(context, this.restApiConfiguration);
            if (route) {
                // injecting controller and controller object in HttpContext object
                context.controller = route.controller;
                context.controllerObject = new route.controller();
            }

            // Mapping request with api method
            const routeDescriptor = ApiMethodMapper(context, this.restApiConfiguration);
            context.routeDescriptor = routeDescriptor;

            // sending request to Auth handler
            if (this.restApiConfiguration.AuthHandler) {
                const authResult = this.restApiConfiguration.AuthHandler.handle(context);
                if (!authResult) {
                    throw new UnAuthenticateException();
                }
            }

            // validating request body, params and query string
            if (this.restApiConfiguration.ModelValidationHandler) {
                const modelValidationHandlerResult = this.restApiConfiguration.ModelValidationHandler.validate(context, routeDescriptor);
                if (modelValidationHandlerResult.length && !context.response.headersSent) {
                    // throw new BadRequestException(context, modelValidationHandlerResult, this.restApiConfiguration);
                    throw new BadRequestException(modelValidationHandlerResult.map(val => val.errorMessage));
                }
            }

            // custom filters execution
            const filterExecuter = new FilterExecuter(context, routeDescriptor, this.restApiConfiguration.Filters);
            filterExecuter.executeBeforeActionExceduted();

            let httpResponse = getHttpResponse(context)
            // Resolve Dependency of Controller
            let di = new DependencyInjection(context, httpResponse);
            di.inject()
            // get arugments array to call api method
            const args = Reflect.getMetadata(Constants.metadata.args, context.controllerObject) as any[];
            const method = routeDescriptor.descriptor.value;
            const data = method.apply(context.controllerObject as Object, args);
            if (!context.response.headersSent) {
                filterExecuter.executeAfterActionExceduted();
                if (!context.response.headersSent) {
                    if (!context.httpResponseMessage) {
                        context.controllerObject.response.send(data);
                    }
                    this.restApiConfiguration.HttpResponseHandler.sendResponse(context, context.httpResponseMessage);
                }
            }
            return;                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 
        } catch (e) {
            if (e && e.constructor && e.constructor.name === "Error") {
                if (this.restApiConfiguration.ExceptionHandler && !context.response.headersSent) {
                    this.restApiConfiguration.ExceptionHandler.handleException(context, e);
                }
            } else {
                if (e && e.httpResponseMessage && !context.response.headersSent) {
                    this.restApiConfiguration.HttpResponseHandler.sendResponse(context, e.httpResponseMessage);
                }
            }
        }                                                                                                   
    }
}
