import { HttpContext } from "./http-context";
import { Response } from "express-serve-static-core";

export interface IHttpResponseHandler {
    sendResponse(context: HttpContext, data: any): Response;
}