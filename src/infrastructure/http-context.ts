import { Request, Response } from "express-serve-static-core";

export class HttpContext {
    public readonly request: Request;
    public readonly response: Response;
    public isAuthenticated: boolean = false;
    public controller: any;
    public controllerObject: any;

    constructor(req: Request, res: Response) {
        this.request = req;
        this.response = res;
    }

}