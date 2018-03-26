import { IHttpRequestHandler } from ".";
import { HttpContext } from "..";

export class HttpRequestHandler implements IHttpRequestHandler {
    public handle(context: HttpContext): void {
        context.response.send("Message from http request handler");
    }
}