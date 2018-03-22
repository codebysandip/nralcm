import { IHttpResponseHandler } from "./IHttpResponseHandler";
import { HttpContext } from "./http-context";
import { Response } from "express-serve-static-core";

export class HttpResponse {
    private httpResponsehandler: IHttpResponseHandler;
    private httpContext: HttpContext;

    constructor(httpResponsehandler: IHttpResponseHandler, context: HttpContext) {
        this.httpResponsehandler = httpResponsehandler;
        this.httpContext = context;
    }

    public send(data: any): Response {
        return this.httpResponsehandler.sendResponse(this.httpContext, data);
    }
}