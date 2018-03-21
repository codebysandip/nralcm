import { Request, Response } from "express-serve-static-core";

export class HttpContext {
    public request: Request;
    public response: Response;
    public isAuthenticated: boolean;
    public controller?: any;
    public controllerObject?: any;

    // private static context: HttpContext;

    constructor(req: Request, res: Response) {
        this.request = req;
        this.response = res;
    }

    // public static getInstance(req: Request, res: Response) {
    //     if (!this.context) {
    //         this.context = new HttpContext();
    //     }
    //     this.context.request = req;
    //     this.context.response = res;
    //     return this.context;
    // }
}