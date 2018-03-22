import { Request, Response } from "express-serve-static-core";
import { HttpResponse } from "./http-response";


export class BaseController {
    public request: Request;
    public response: HttpResponse;
}