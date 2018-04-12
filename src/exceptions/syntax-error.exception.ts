import { HttpResponseMessage } from "../lifecycle";
import { Exception } from "../core";
import { StatusCode } from "../common/enums";

/**
 * Expection class to throw syntax error 400 when body of request is not valid json
 */
export class SyntaxErrorException<T> extends Exception<T> {
    httpResponseMessage: HttpResponseMessage<T>;
    constructor() {
        super();
        this.httpResponseMessage = new HttpResponseMessage();
        this.httpResponseMessage.errorMessages = ["api not found"];
        this.httpResponseMessage.statusCode = StatusCode.BadRequest;
    }
}
