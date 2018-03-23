import { HttpContext } from "./http-context";

export interface IHttpRequestHandler {
    handle(context: HttpContext): void;
}