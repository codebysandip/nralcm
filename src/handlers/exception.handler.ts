import { IExceptionHandler } from "../infrastructure/IExceptionHandler";
import { HttpContext } from "../infrastructure/http-context";
import { ServerErrorException } from "../exceptions/server-error.exception";

export class ExceptionHandler implements IExceptionHandler {
    public handleException(context: HttpContext, exception: any) {
        // log your exception
        console.log("Stack", exception.stack);
        new ServerErrorException(context);
        return;
    }
}