import { HttpResponseMessage } from "../lifecycle";
import { Exception } from "../core";
import { StatusCode } from "../common/enums";

/**
 * Expection class to throw handler not found 400
 */
export class HandlerNotFoundException<T> extends Exception<T> {
    httpResponseMessage: HttpResponseMessage<T>;
    constructor() {
        super();
        this.httpResponseMessage = new HttpResponseMessage();
        this.httpResponseMessage.errorMessages = ["There is no handler supported for the request"];
        this.httpResponseMessage.statusCode = StatusCode.BadRequest;
    }
}
