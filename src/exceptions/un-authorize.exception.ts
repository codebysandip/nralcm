import { HttpResponseMessage } from "../lifecycle";
import { StatusCode } from "../common/enums";
import { Exception } from "../core";

/**
 * Expection class to throw UnAuthorized 403
 */
export class UnAuthorizeException<T> extends Exception<T> {
    httpResponseMessage: HttpResponseMessage<T>;
    constructor(message?: string) {
        super();
        this.httpResponseMessage = new HttpResponseMessage();
        this.httpResponseMessage.errorMessages = [message || "User not Authorize"];
        this.httpResponseMessage.statusCode = StatusCode.Forbidden;
    }
}
