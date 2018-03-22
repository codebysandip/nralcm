import { IAuthentication } from "./IAuthentication";
import { IAuthorize } from "./IAuthorize";
import { IExceptionHandler } from "../infrastructure/IExceptionHandler";
import { IAuthHandler } from "../infrastructure/IAuthHandler";
import { IHttpResponseHandler } from "./IHttpResponseHandler";
import { IModelValidation } from "./IModelValidation";
import { AuthHandler } from "../handlers/auth.handler";

/**
 * Configuration class for Rest api
 */
export class RestApiConfiguration {
    private authenticationFilter: IAuthentication;
    private authorizeFilter: IAuthorize;
    private exceptionHandler: IExceptionHandler;
    private authHandler: IAuthHandler = new AuthHandler();
    private modelValidationHandler: IModelValidation;
    private httpResponseHandler: IHttpResponseHandler;
    // public filters: IRestApiFilter[];

    private static config: RestApiConfiguration;

    private constructor() {

    }

    public static getInstance() {
        if (!this.config) {
            this.config = new RestApiConfiguration();
        }
        return this.config;
    }

    public setAuthenticationFilter(filter: IAuthentication) {
        this.authenticationFilter = filter;
    }

    public getAuthenticationFilter() {
        return this.authenticationFilter;
    }

    public setAuthorizeFilter(filter: IAuthorize) {
        this.authorizeFilter = filter;
    }

    public getAuthorizeFilter() {
        return this.authorizeFilter;
    }

    public setExceptionHandler(handler: IExceptionHandler) {
        this.exceptionHandler = handler;
    }

    public getExceptionHandler() {
        return this.exceptionHandler;
    }

    public getAuthHandler() {
        return this.authHandler;
    }

    public setModelValidationHandler(handler: IModelValidation) {
        this.modelValidationHandler = handler;
    }

    public getModelValidationHandler() {
        return this.modelValidationHandler;
    }

    public setHttpResponseHandler(handler: IHttpResponseHandler) {
        this.httpResponseHandler = handler;
    }

    public getHttpResponseHandler() {
        return this.httpResponseHandler;
    }
}