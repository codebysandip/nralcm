import { HttpResponse, HttpContext } from "../../lifecycle";

export function getHttpResponse(context: HttpContext) {
    let httpResponse = new HttpResponse(context);
    return httpResponse;
}