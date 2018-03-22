import { HttpContext } from "./http-context";

export interface IExceptionHandler {
    handleException(context: HttpContext, exception: any): void;
}