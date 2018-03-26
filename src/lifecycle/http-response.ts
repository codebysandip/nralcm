import { HttpContext } from "./http-context";
import { Response } from "express-serve-static-core";
import { IHttpResponseHandler, RestApiConfiguration } from ".";

export class HttpResponse {
    private httpResponsehandler: IHttpResponseHandler = RestApiConfiguration.HttpResponseHandler;
    private httpContext: HttpContext;

    constructor(context: HttpContext) {
        this.httpContext = context;
    }

    public send(data: any): Response {
        return this.httpResponsehandler.sendResponse(this.httpContext, data);
    }
}