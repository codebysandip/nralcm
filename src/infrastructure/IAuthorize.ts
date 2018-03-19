import { HttpContext } from "./http-request";
import { HttpResponse } from "./http-response";
import { UnAuthorizeException } from "../exceptions/unauthorize.exception";

export interface IAuthorize {
    authorize(context: HttpContext, roles: string[]): boolean|UnAuthorizeException;
}