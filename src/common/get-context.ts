import { HttpContext } from "../infrastructure/http-request";
import { Request, Response } from "express-serve-static-core";

export function getContext(req: Request, res: Response) {
    const httpContext: HttpContext = {
        isAuthenticated: false,
        request: req,
        response: res
    };
    return httpContext;
}
