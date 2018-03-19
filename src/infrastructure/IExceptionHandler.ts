import { HttpContext } from "./http-request";

export interface IExceptionHandler {
    handleException(context: HttpContext, exception: any): void;
}