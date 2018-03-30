import { IAuthenticate } from "../security";
import { IAuthorize } from "../security";
import { IExceptionHandler } from "../exception-handler";
import { IAuthHandler } from "../security";
import { IHttpResponseHandler } from "../http-handler";
import { IModelValidation } from "../validation";
import { IFilter } from "../filter";
import { IHttpRequestHandler } from "../http-handler";
import { IRoute } from "../../common";
/**
 * RestApiConfiguration class provides property and methods to configure Rest api
 */
export class RestApiConfiguration {
    private _authenticationFilter: IAuthenticate;
    private _authorizeFilter: IAuthorize;
    private _exceptionHandler: IExceptionHandler;
    private _authHandler: IAuthHandler;
    private _modelValidationHandler: IModelValidation;
    private _httpResponseHandler: IHttpResponseHandler;
    private _filters: IFilter[] = [];
    private _httpRrequestHandler: IHttpRequestHandler;
    private _routes: IRoute[] = [];

    /**
     * set AuthenticationFilter
     * @param filter - class that implemented interface IAuthenticate
     */
    set AuthenticationFilter(filter: IAuthenticate) {
        this._authenticationFilter = filter;
    }

    /**
     * get AuthenticationFilter
     */
    // tslint:disable-next-line:typedef
    get AuthenticationFilter() {
        return this._authenticationFilter;
    }

    /**
     * set AuthorizeFilter
     * @param filter - class that implemented interface IAuthorize
     */
    set AuthorizeFilter(filter: IAuthorize) {
        this._authorizeFilter = filter;
    }

    /**
     * get AuthorizeFilter
     */
    // tslint:disable-next-line:typedef
    get AuthorizeFilter() {
        return this._authorizeFilter;
    }

    /**
     * set ExceptionHandler
     * @param handler - class that implemented interface IExceptionHandler
     */
    set ExceptionHandler(handler: IExceptionHandler) {
        this._exceptionHandler = handler;
    }

    /**
     * get ExceptionHandler
     */
    // tslint:disable-next-line:typedef
    get ExceptionHandler() {
        return this._exceptionHandler;
    }

    /**
     * get AuthHandler
     */
    // tslint:disable-next-line:typedef
    get AuthHandler() {
        return this._authHandler;
    }

    /**
     * set IAuthHandler
     */
    set AuthHandler(authHandler: IAuthHandler) {
        this._authHandler = authHandler;
    }

    /**
     * set ModelValidationHandler
     * @param handler - class that implemented interface IExceptionHandler
     */
    set ModelValidationHandler(handler: IModelValidation) {
        this._modelValidationHandler = handler;
    }

    /**
     * get ModelValidationHandler
     */
    // tslint:disable-next-line:typedef
    get ModelValidationHandler() {
        return this._modelValidationHandler;
    }

    /**
     * set HttpResponseHandler
     * @param handler - class that implemented interface IHttpResponseHandler
     */
    set HttpResponseHandler(handler: IHttpResponseHandler) {
        this._httpResponseHandler = handler;
    }

    /**
     * get HttpResponseHandler
     */
    // tslint:disable-next-line:typedef
    get HttpResponseHandler() {
        return this._httpResponseHandler;
    }

    /**
     * get registered filters
     */
    // tslint:disable-next-line:typedef
    get Filters() {
        return this._filters;
    }

    /**
     * register global filters
     * @param filter - class that implemented interface IFilter
     */
    public addFilter (filter: IFilter): void {
        this._filters.push(filter);
    }

    /**
     * get HttpRequestHandler
     */
    // tslint:disable-next-line:typedef
    get HttpRequestHandler() {
        return this._httpRrequestHandler;
    }

    /**
     * set HttpRequestHandler
     * @param httpRequestHandler - class that implemented interface IHttpRequestHandler
     */
    set HttpRequestHandler(httpRequestHandler: IHttpRequestHandler) {
        this._httpRrequestHandler = httpRequestHandler;
    }

    /**
     * get registered api routes
     */
    // tslint:disable-next-line:typedef
    get routes() {
        return this._routes;
    }

    /**
     * method to add api routes
     * @param routes Route Object array
     */
    public addRoutes(routes: IRoute[]): void {
        this._routes = [...this._routes, ...routes];
    }
}