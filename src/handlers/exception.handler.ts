import { IExceptionHandler } from "../infrastructure/IExceptionHandler";
import { HttpContext } from "../infrastructure/http-context";
import { nrlcm } from "../infrastructure/exception";

export class ExceptionHandler implements IExceptionHandler {
    public handleException(context: HttpContext, exception: any) {
        // log your exception
        console.log("Stack", exception.stack);
        new nrlcm.Exception.ServerErrorException(context);
        return;
    }
}