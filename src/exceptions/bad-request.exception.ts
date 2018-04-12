import { HttpResponseMessage } from "../lifecycle";
import { Exception } from "../core";
import { StatusCode } from "../common/enums";

/**
 * Expection class to throw bad request 400
 */
export class BadRequestException<T> extends Exception<T> {
    httpResponseMessage: HttpResponseMessage<T>;
    constructor(errorMessages: string[]) {
        super();
        this.httpResponseMessage = new HttpResponseMessage();
        this.httpResponseMessage.errorMessages = errorMessages;
        this.httpResponseMessage.statusCode = StatusCode.BadRequest;
    }
}
