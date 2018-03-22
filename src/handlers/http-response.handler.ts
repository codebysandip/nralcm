import { IHttpResponseHandler } from "../infrastructure/IHttpResponseHandler";
import { HttpContext } from "../infrastructure/http-context";
import { Response } from "express-serve-static-core";

export class HttpResponseHandler implements IHttpResponseHandler {
    public sendResponse(context: HttpContext, data: any): Response {
        return context.response.send(data);
    }
}