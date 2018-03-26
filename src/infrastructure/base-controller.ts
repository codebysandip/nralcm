import { HttpResponse } from "./http-response";


export abstract class BaseController {
    public request: Request;
    public response: HttpResponse;
}