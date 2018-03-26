import { IAuthenticate } from "../security";
import { IAuthorize } from "../security";
import { IExceptionHandler } from "../exception-handler";
import { IAuthHandler } from "../security";
import { IHttpResponseHandler } from "../http-handler";
import { IModelValidation } from "../validation";
import { AuthHandler } from "../security";
import { IFilter } from "../filter";
import { IHttpRequestHandler } from "../http-handler";
import { IRoute } from "../../common";
/**
 * Configuration class for Rest api
 */
export class RestApiConfiguration {
    private static _authenticationFilter: IAuthenticate;
    private static _authorizeFilter: IAuthorize;
    private static _exceptionHandler: IExceptionHandler;
    private static _authHandler: IAuthHandler = new AuthHandler();
    private static _modelValidationHandler: IModelValidation;
    private static _httpResponseHandler: IHttpResponseHandler;
    private static _filters: IFilter[] = [];
    private static _httpRrequestHandler: IHttpRequestHandler;
    private static _routes: IRoute[] = [];


    static set AuthenticationFilter(filter: IAuthenticate) {
        this._authenticationFilter = filter;
    }

    static get AuthenticationFilter() {
        return this._authenticationFilter;
    }

    static set AuthorizeFilter(filter: IAuthorize) {
        this._authorizeFilter = filter;
    }

    static get AuthorizeFilter() {
        return this._authorizeFilter;
    }

    static set ExceptionHandler(handler: IExceptionHandler) {
        this._exceptionHandler = handler;
    }

    static get ExceptionHandler() {
        return this._exceptionHandler;
    }

    static get AuthHandler() {
        return this._authHandler;
    }

    static set ModelValidationHandler(handler: IModelValidation) {
        this._modelValidationHandler = handler;
    }

    static get ModelValidationHandler() {
        return this._modelValidationHandler;
    }

    static set HttpResponseHandler(handler: IHttpResponseHandler) {
        this._httpResponseHandler = handler;
    }

    static get HttpResponseHandler() {
        return this._httpResponseHandler;
    }

    static get Filters() {
        return this._filters;
    }

    public static addFilter (filter: IFilter) {
        this._filters.push(filter);
    }

    static get HttpRequestHandler() {
        return this._httpRrequestHandler;
    }

    static set HttpRequestHandler(httpRequestHandler: IHttpRequestHandler) {
        this._httpRrequestHandler = httpRequestHandler;
    }

    static get routes() {
        return this._routes;
    }

    public static addRoutes(routes: IRoute[]) {
        this._routes = [...this._routes, ...routes];
    }
}