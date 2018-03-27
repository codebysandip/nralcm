import { HttpContext } from "..";

/**
 * Interface to implement ExceptionHandler
 * ExceptionHandler can be use for logging errors. Errors occured in Rest api that not handled
 * will catch by ExceptionHandler
 */
export interface IExceptionHandler {
    /**
     * Method for handle exception
     * @param context HttpContext Object
     * @param exception Exception Object
     */
    handleException(context: HttpContext, exception: any): void;
}