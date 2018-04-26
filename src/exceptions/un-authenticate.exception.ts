import { HttpResponseMessage } from "../lifecycle";
import { StatusCode } from "../common/enums";
import { Exception } from "../core";

/**
 * Expection class to throw UnAuthenticate 401
 */
export class UnAuthenticateException<T> extends Exception<T> {
    httpResponseMessage: HttpResponseMessage<T>;
    constructor(message?: string) {
        super();
        this.httpResponseMessage = new HttpResponseMessage();
        this.httpResponseMessage.errorMessages = [message || "User not Authenicated"];
        this.httpResponseMessage.statusCode = StatusCode.Unauthorized;
    }
}
