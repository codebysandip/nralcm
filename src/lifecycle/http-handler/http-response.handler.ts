import { Response } from "express-serve-static-core";
import { IHttpResponseHandler } from ".";
import { HttpContext } from "..";

export class HttpResponseHandler implements IHttpResponseHandler {
    public sendResponse(context: HttpContext, data: any): Response {
        return context.response.send(data);
    }
}