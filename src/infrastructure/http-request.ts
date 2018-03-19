import { Request, Response } from "express-serve-static-core";

export class HttpContext {
    public request: Request;
    public response: Response;
    public isAuthenticated: boolean;
    public controller?: any;
    public controllerObject?: any;
}