import { Response } from "express-serve-static-core";
import { IHttpResponseHandler } from ".";
import { HttpContext, HttpResponseMessage } from "..";
// import { StatusCode } from "../../common/enums";
import { ResponseData } from "../../common/models";
import { StatusCode } from "../../common/enums";

/**
 * DefaultHttpResponseHandler will be used when HttpResponseHandler not registered in RestApiConfiguration
 */
export class DefaultHttpResponseHandler implements IHttpResponseHandler {
    /**
     * Method to send response
     * @param context HttpContext Object
     * @param httpResponseMessage HttpResponseMessage Object
     */
    public sendResponse(context: HttpContext): Response | void {
        this.setHeader(context);

        let responseData: ResponseData|undefined = this.setResponseData(context.httpResponseMessage);
        let statusCode = context.httpResponseMessage ? context.httpResponseMessage.statusCode : StatusCode.Ok;
        return context.response.type("application/json").status(statusCode)
            .json(responseData);
    }

    private setHeader(context: HttpContext) {
        if (context.httpResponseMessage && context.httpResponseMessage.headers && context.httpResponseMessage.headers.size > 0) {
            for (let [key, value] of context.httpResponseMessage.headers) {
                context.response.setHeader(key, value);
            }
        }
    }

    private setResponseData<T>(httpResponseMessage: HttpResponseMessage<T>) {
        if (httpResponseMessage) {
            let responseData: ResponseData = {
                data: httpResponseMessage.body,
                statusCode: httpResponseMessage.statusCode,
                successMessage: httpResponseMessage.successMessage,
                errorMessage: httpResponseMessage.errorMessages || []
            };
            return responseData;
        }
        return undefined;
    }
}