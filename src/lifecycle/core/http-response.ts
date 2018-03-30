import { HttpContext } from "./http-context";
import { Response } from "express-serve-static-core";
import { HttpResponseMessage } from ".";
import { IHttpResponseHandler } from "..";
import { StatusCode } from "../../common/enums";

/**
 * HttpResponse class have instance members to send response from api method
 */
export class HttpResponse {
    constructor(private _context: HttpContext, private _httpResponsehandler: IHttpResponseHandler) {
    }

    private _httpResponseMessage: HttpResponseMessage<any>;
    private _body: any;
    private _statusCode: StatusCode;
    private _headers: Map<string, string>;

    /**
     * Method to send response.
     * Internally it calls to HttpResponseHandler.sendResponse
     * @param body Response body
     * @param statusCode Status Code of Response
     * @param headers Headers to be sent
     */
    public send<T>(body: T, statusCode?: StatusCode, headers?: Map<string, string>): Response {
        this._body = body;
        this._statusCode = statusCode || StatusCode.Ok;
        this._headers = headers || new Map<string, string>();
        return this.sendResponse<T>();
    }

    /**
     * Method to send response.
     * Internally it calls to HttpResponseHandler.sendResponse
     * @param httpResponseMessage HttpResponseMessage Object
     */
    public sendHttpResponse<T>(httpResponseMessage: HttpResponseMessage<T>): Response {
        this._httpResponseMessage = httpResponseMessage;
        return this.sendResponse<T>();
    }

    private sendResponse<T>(): Response {
        if (!this._httpResponseMessage) {
            this._httpResponseMessage = new HttpResponseMessage<T>();
            this._httpResponseMessage.body = this._body;
            this._httpResponseMessage.statusCode = this._statusCode;
            this._httpResponseMessage.headers = this._headers;
        }
        return this._httpResponsehandler.sendResponse<T>(this._context, this._httpResponseMessage);
    }
}