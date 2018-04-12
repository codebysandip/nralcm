import { HttpResponseMessage } from "../lifecycle";
import { StatusCode } from "../common/enums";
import { Exception } from "../core";

/**
 * Expection class to throw not found 404 when route not found
 */
export class NotFoundException<T> extends Exception<T> {
    httpResponseMessage: HttpResponseMessage<T>;
    constructor() {
        super();
        this.httpResponseMessage = new HttpResponseMessage();
        this.httpResponseMessage.errorMessages = ["api not found"];
        this.httpResponseMessage.statusCode = StatusCode.NotFound;
    }
}

