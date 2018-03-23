import { IHttpRequestHandler } from "../infrastructure/IHttpRequest.handler";
import { HttpContext } from "../infrastructure/http-context";

export class HttpRequestHandler implements IHttpRequestHandler {
    public handle(context: HttpContext): void {
        context.response.send("Message from http request handler");
    }
}