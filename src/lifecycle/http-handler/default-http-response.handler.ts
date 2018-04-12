import { Response } from "express-serve-static-core";
import { IHttpResponseHandler } from ".";
import { HttpContext, HttpResponseMessage } from "..";
// import { StatusCode } from "../../common/enums";
import { ResponseData } from "../../common/models";
import * as Rx from "rxjs";
/**
 * DefaultHttpResponseHandler will be used when HttpResponseHandler not registered in RestApiConfiguration
 */
export class DefaultHttpResponseHandler implements IHttpResponseHandler {
    /**
     * Method to send response
     * @param context HttpContext Object
     * @param httpResponseMessage HttpResponseMessage Object
     */
    public sendResponse<T>(context: HttpContext, httpResponseMessage: HttpResponseMessage<T>): Response|void {
        this.setHeader(httpResponseMessage, context);

        let responseData: ResponseData = this.setResponseData(httpResponseMessage);
        if (context.isObservableResponse && context.httpResponseMessage.body instanceof Rx.Observable) {
            (context.httpResponseMessage.body as Rx.Observable<T>).take(1).subscribe(data => {
                responseData.data = data;
                return context.response.type("application/json").status(httpResponseMessage.statusCode)
                .json(responseData);
            }, error => {
                if (error && error.httpResponseMessage) {
                    let responseData: ResponseData = this.setResponseData(error.httpResponseMessage)
                    responseData.data = undefined;
                    return context.response.type("application/json").status(error.httpResponseMessage.statusCode)
                        .send(responseData);
                } else {
                    throw error;
                }
            });
        } else {
            return context.response.type("application/json").status(httpResponseMessage.statusCode)
                .json(responseData);
        }
    }

    private setHeader<T>(httpResponseMessage: HttpResponseMessage<T>, context: HttpContext) {
        if (httpResponseMessage.headers.size > 0) {
            for (let [key, value] of httpResponseMessage.headers) {
                context.response.setHeader(key, value);
            }
        }
    }

    private setResponseData<T>(httpResponseMessage: HttpResponseMessage<T>) {
        let responseData: ResponseData =  {
            data: httpResponseMessage.body,
            statusCode: httpResponseMessage.statusCode,
            successMessage: httpResponseMessage.successMessage,
            errorMessage: httpResponseMessage.errorMessages || []
        };
        return responseData;
    }
}