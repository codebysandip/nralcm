import { HttpContext } from "..";

export interface IExceptionHandler {
    handleException(context: HttpContext, exception: any): void;
}