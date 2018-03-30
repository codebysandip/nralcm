import { IExceptionHandler } from "./IExceptionHandler";
import { HttpContext } from "..";
import { ServerErrorException } from "../../exceptions";

/**
 * Default ExceptionHandler to handle all expceptions in rest api
 */
export class ExceptionHandler implements IExceptionHandler {
    /**
     * Method for handle exception
     * @param context HttpContext Object
     * @param exception Exception Object
     */
    public handleException(context: HttpContext, exception: any): void {
        // log your exception
        console.log("Stack", exception.stack);
        new ServerErrorException(context);
        return;
    }
}