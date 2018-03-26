import { Response } from "express-serve-static-core";
import { HttpContext } from "..";

export interface IHttpResponseHandler {
    sendResponse(context: HttpContext, data: any): Response;
}