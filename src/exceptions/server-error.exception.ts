import { HttpResponseMessage } from "../lifecycle";
import { Exception } from "../core";
import { StatusCode } from "../common/enums";

/**
 * Expection class to throw server error 500
 */
export class ServerErrorException<T> extends Exception<T> {
    httpResponseMessage: HttpResponseMessage<T>;
    constructor(message?: string) {
        super();
        this.httpResponseMessage = new HttpResponseMessage();
        this.httpResponseMessage.errorMessages = [message || "Oops! Something went wrong. Please try after sometime."];
        this.httpResponseMessage.statusCode = StatusCode.InternalServerError;
    }
}
