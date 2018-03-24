import { Request, Response } from "express-serve-static-core";
import { AuthPrinciple } from "./AuthPrinciple";
import { RouteDescriptor } from "./route-descriptor";

export class HttpContext {
    public readonly request: Request;
    public readonly response: Response;
    public controller: any;
    public controllerObject: any;
    public user: AuthPrinciple;
    public routeDescriptor: RouteDescriptor;

    constructor(req: Request, res: Response) {
        this.request = req;
        this.response = res;
    }

}