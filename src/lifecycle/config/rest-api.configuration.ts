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
 * RestApiConfiguration class provides static property and methods to configure Rest api
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

    /**
     * set AuthenticationFilter
     * @param filter - class that implemented interface IAuthenticate
     */
    static set AuthenticationFilter(filter: IAuthenticate) {
        this._authenticationFilter = filter;
    }

    /**
     * get AuthenticationFilter
     */
    // tslint:disable-next-line:typedef
    static get AuthenticationFilter() {
        return this._authenticationFilter;
    }

    /**
     * set AuthorizeFilter
     * @param filter - class that implemented interface IAuthorize
     */
    static set AuthorizeFilter(filter: IAuthorize) {
        this._authorizeFilter = filter;
    }

    /**
     * get AuthorizeFilter
     */
    // tslint:disable-next-line:typedef
    static get AuthorizeFilter() {
        return this._authorizeFilter;
    }

    /**
     * set ExceptionHandler
     * @param handler - class that implemented interface IExceptionHandler
     */
    static set ExceptionHandler(handler: IExceptionHandler) {
        this._exceptionHandler = handler;
    }

    /**
     * get ExceptionHandler
     */
    // tslint:disable-next-line:typedef
    static get ExceptionHandler() {
        return this._exceptionHandler;
    }

    /**
     * get AuthHandler
     */
    // tslint:disable-next-line:typedef
    static get AuthHandler() {
        return this._authHandler;
    }

    /**
     * set ModelValidationHandler
     * @param handler - class that implemented interface IExceptionHandler
     */
    static set ModelValidationHandler(handler: IModelValidation) {
        this._modelValidationHandler = handler;
    }

    /**
     * get ModelValidationHandler
     */
    // tslint:disable-next-line:typedef
    static get ModelValidationHandler() {
        return this._modelValidationHandler;
    }

    /**
     * set HttpResponseHandler
     * @param handler - class that implemented interface IHttpResponseHandler
     */
    static set HttpResponseHandler(handler: IHttpResponseHandler) {
        this._httpResponseHandler = handler;
    }

    /**
     * get HttpResponseHandler
     */
    // tslint:disable-next-line:typedef
    static get HttpResponseHandler() {
        return this._httpResponseHandler;
    }

    /**
     * get registered filters
     */
    // tslint:disable-next-line:typedef
    static get Filters() {
        return this._filters;
    }

    /**
     * register global filters
     * @param filter - class that implemented interface IFilter
     */
    public static addFilter (filter: IFilter): void {
        this._filters.push(filter);
    }

    /**
     * get HttpRequestHandler
     */
    // tslint:disable-next-line:typedef
    static get HttpRequestHandler() {
        return this._httpRrequestHandler;
    }

    /**
     * set HttpRequestHandler
     * @param httpRequestHandler - class that implemented interface IHttpRequestHandler
     */
    static set HttpRequestHandler(httpRequestHandler: IHttpRequestHandler) {
        this._httpRrequestHandler = httpRequestHandler;
    }

    /**
     * get registered api routes
     */
    // tslint:disable-next-line:typedef
    static get routes() {
        return this._routes;
    }

    /**
     * method to add api routes
     * @param routes Route Object array
     */
    public static addRoutes(routes: IRoute[]): void {
        this._routes = [...this._routes, ...routes];
    }
}