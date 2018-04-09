import { HttpContext, HttpResponseMessage, RestApiConfiguration } from "../lifecycle";
import { StatusCode } from "../common/enums";

/**
 * Expection class to throw not found 404 when route not found
 */
export class NotFoundException {
    constructor(context: HttpContext, private restApiConfiguration: RestApiConfiguration) {
        const httpResponseMessage = new HttpResponseMessage();
        httpResponseMessage.errorMessages = ["User not Authenicated"];
        httpResponseMessage.statusCode = StatusCode.NotFound;
        this.restApiConfiguration.HttpResponseHandler.sendResponse(context, httpResponseMessage);
        // context.response.type("application/json").status(404).send({ message: "No api found"});
    }
}
