import { HttpResponse, HttpContext, IHttpResponseHandler } from "../../lifecycle";

export function getHttpResponse(context: HttpContext, httpResponseHandler: IHttpResponseHandler) {
    let httpResponse = new HttpResponse(context, httpResponseHandler);
    return httpResponse;
}