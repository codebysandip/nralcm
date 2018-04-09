import { HttpContext, HttpResponseMessage, RestApiConfiguration } from "../lifecycle";
import { StatusCode } from "../common/enums";

/**
 * Expection class to throw UnAuthenticate 401
 */
export class UnAuthenticateException {
    constructor(context: HttpContext, private restApiConfiguration: RestApiConfiguration) {
        const httpResponseMessage = new HttpResponseMessage();
        httpResponseMessage.errorMessages = ["User not Authenicated"];
        httpResponseMessage.statusCode = StatusCode.Unauthorized;
        this.restApiConfiguration.HttpResponseHandler.sendResponse(context, httpResponseMessage);
        // context.response.type("application/json").status(401).send({ message: "User not Authenicated"});
    }
}
