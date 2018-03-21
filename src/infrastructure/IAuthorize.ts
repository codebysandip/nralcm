import { HttpContext } from "./http-context";
import { HttpResponse } from "./http-response";
import { UnAuthorizeException } from "../exceptions/unauthorize.exception";

export interface IAuthorize {
    authorize(context: HttpContext, roles: string[]): boolean|UnAuthorizeException;
}