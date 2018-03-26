import { HttpContext } from "..";

export interface IHttpRequestHandler {
    handle(context: HttpContext): void;
}