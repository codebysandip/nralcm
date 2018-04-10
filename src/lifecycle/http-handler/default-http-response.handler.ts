import { Response } from "express-serve-static-core";
import { IHttpResponseHandler } from ".";
import { HttpContext, HttpResponseMessage } from "..";
// import { StatusCode } from "../../common/enums";
import { ResponseData } from "../../common/models";
import { Observable } from "rxjs/Observable";
import 'rxjs/add/operator/toPromise';
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
        if (httpResponseMessage.headers.size > 0) {
            for (let [key, value] of httpResponseMessage.headers) {
                context.response.setHeader(key, value);
            }
        }

        let responseData: ResponseData =  {
            data: httpResponseMessage.body,
            statusCode: httpResponseMessage.statusCode,
            successMessage: httpResponseMessage.successMessage,
            errorMessage: httpResponseMessage.errorMessages
        };
        if (context.isObservableResponse) {
            (context.httpResponseMessage.body as Observable<T>).subscribe(data => {
                context.httpResponseMessage.body = data;
                return context.response.type("application/json").status(httpResponseMessage.statusCode)
                .json(data);
            }, error => {
                throw error;
            });
            // let result = (context.httpResponseMessage.body as Observable<T>).toPromise();//(result => {
            // result.then(data => console.log("data", data)).catch(err => console.log("errror", err));
            // console.log("result", result);
            // context.httpResponseMessage.body = result;
            
            // });
        } else {
            return context.response.type("application/json").status(httpResponseMessage.statusCode)
                .send(responseData);
        }
    }

    /**
     * Method to check success or error response based on StatusCode
     * @param statusCode StatusCode
     */
    // private isSuccess(statusCode: StatusCode): boolean {
    //     if ((statusCode.toString() as string).startsWith("2")) {
    //         return true;
    //     } else {
    //         return false;
    //     }
    // }
}