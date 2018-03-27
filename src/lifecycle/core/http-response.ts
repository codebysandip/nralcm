import { HttpContext } from "./http-context";
import { Response } from "express-serve-static-core";
import { HttpResponseMessage } from ".";
import { IHttpResponseHandler, RestApiConfiguration } from "..";
import { StatusCode } from "../../common/enums";

/**
 * HttpResponse class have instance members to send data from api method
 */
export class HttpResponse {
    constructor(context: HttpContext) {
        this.httpContext = context;
    }

    private httpResponsehandler: IHttpResponseHandler = RestApiConfiguration.HttpResponseHandler;
    private httpContext: HttpContext;
    private httpResponseMessage: HttpResponseMessage<any>;
    private data: any;

    public send(data: any): Response {
        this.data = data;
        return this.sendResponse();
    }

    public sendHttpResponse<T>(httpResponseMessage: HttpResponseMessage<T>): Response {
        this.httpResponseMessage = httpResponseMessage;
        return this.sendResponse();
    }

    private sendResponse(): Response {
        if (!this.httpResponseMessage) {
            this.httpResponseMessage = new HttpResponseMessage();
            this.httpResponseMessage.body = this.data;
            this.httpResponseMessage.statusCode = StatusCode.Ok;
        }
        return this.httpResponsehandler.sendResponse(this.httpContext, this.httpResponseMessage);
    }
}