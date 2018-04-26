import { Request, Response } from "express-serve-static-core";
import { AuthPrinciple, HttpResponseMessage } from "..";
import { RouteDescriptor } from "../../common";

/**
 * HttpContext class holds data of current request lifecycle
 */
export class HttpContext {
    public readonly request: Request;
    public readonly response: Response;
    public controller: any;
    public controllerObject: any;
    public user: AuthPrinciple;
    public routeDescriptor: RouteDescriptor;
    public httpResponseMessage: HttpResponseMessage<any>;

    constructor(req: Request, res: Response) {
        this.request = req;
        this.response = res;
    }

}