import { HttpResponseMessage } from "../lifecycle";
import { Exception } from "../core";
import { StatusCode } from "../common/enums";

/**
 * Expection class to throw token not valid 401
 */
export class TokenNotValidException<T> extends Exception<T> {
    httpResponseMessage: HttpResponseMessage<T>;
    constructor(message?: string) {
        super();
        this.httpResponseMessage = new HttpResponseMessage();
        this.httpResponseMessage.errorMessages = [message || "Token is not Valid"];
        this.httpResponseMessage.statusCode = StatusCode.Unauthorized;
    }
}
