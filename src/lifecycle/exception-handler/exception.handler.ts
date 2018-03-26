import { IExceptionHandler } from "./IExceptionHandler";
import { HttpContext } from "../http-context";
import { ServerErrorException } from "../../exceptions";

export class ExceptionHandler implements IExceptionHandler {
    public handleException(context: HttpContext, exception: any) {
        // log your exception
        console.log("Stack", exception.stack);
        new ServerErrorException(context);
        return;
    }
}