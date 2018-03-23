import { IAuthentication } from "./IAuthentication";
import { IAuthorize } from "./IAuthorize";
import { IExceptionHandler } from "../infrastructure/IExceptionHandler";
import { IAuthHandler } from "../infrastructure/IAuthHandler";
import { IHttpResponseHandler } from "./IHttpResponseHandler";
import { IModelValidation } from "./IModelValidation";
import { AuthHandler } from "../handlers/auth.handler";
import { IFilter } from "./IFilter";
import { IHttpRequestHandler } from "./IHttpRequest.handler";
/**
 * Configuration class for Rest api
 */
export class RestApiConfiguration {
    private _authenticationFilter: IAuthentication;
    private _authorizeFilter: IAuthorize;
    private _exceptionHandler: IExceptionHandler;
    private _authHandler: IAuthHandler = new AuthHandler();
    private _modelValidationHandler: IModelValidation;
    private _httpResponseHandler: IHttpResponseHandler;
    private _filters: IFilter[] = [];
    private _httpRrequestHandler: IHttpRequestHandler;
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

    set AuthenticationFilter(filter: IAuthentication) {
        this._authenticationFilter = filter;
    }

    get AuthenticationFilter() {
        return this._authenticationFilter;
    }

    set AuthorizeFilter(filter: IAuthorize) {
        this._authorizeFilter = filter;
    }

    get AuthorizeFilter() {
        return this._authorizeFilter;
    }

    set ExceptionHandler(handler: IExceptionHandler) {
        this._exceptionHandler = handler;
    }

    get ExceptionHandler() {
        return this._exceptionHandler;
    }

    get AuthHandler() {
        return this._authHandler;
    }

    set ModelValidationHandler(handler: IModelValidation) {
        this._modelValidationHandler = handler;
    }

    get ModelValidationHandler() {
        return this._modelValidationHandler;
    }

    set HttpResponseHandler(handler: IHttpResponseHandler) {
        this._httpResponseHandler = handler;
    }

    get HttpResponseHandler() {
        return this._httpResponseHandler;
    }

    get Filters() {
        return this._filters;
    }

    public addFilter (filter: IFilter) {
        this._filters.push(filter);
    }

    get HttpRequestHandler() {
        return this._httpRrequestHandler;
    }

    set HttpRequestHandler(httpRequestHandler: IHttpRequestHandler) {
        this._httpRrequestHandler = httpRequestHandler;
    }
}