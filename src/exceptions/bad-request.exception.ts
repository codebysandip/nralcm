import { HttpContext, HttpResponseMessage, RestApiConfiguration } from "../lifecycle";
import { ModelError } from "../common";
import { StatusCode } from "../common/enums";

/**
 * Expection class to throw bad request 400
 */
export class BadRequestException {
    constructor(context: HttpContext, message: ModelError[], private restApiConfiguration: RestApiConfiguration) {
        const httpResponseMessage = new HttpResponseMessage();
        httpResponseMessage.errorMessages = message.map(m => m.errorMessage);
        httpResponseMessage.statusCode = StatusCode.BadRequest;
        this.restApiConfiguration.HttpResponseHandler.sendResponse(context, httpResponseMessage);
        // context.response.type("application/json").status(400).send({ message: message.map(m => m.errorMessage) });
    }
}
