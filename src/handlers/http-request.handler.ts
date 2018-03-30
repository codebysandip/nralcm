import { IHttpRequestHandler } from "../lifecycle/http-handler";
import { HttpContext } from "../lifecycle";

export class HttpRequestHandler implements IHttpRequestHandler {
    public handle(context: HttpContext): void {
        context.response.send("Message from http request handler");
    }
}