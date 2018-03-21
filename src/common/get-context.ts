import { HttpContext } from "../infrastructure/http-context";
import { Request, Response } from "express-serve-static-core";

export function getContext(req: Request, res: Response) {
    const httpContext: HttpContext = new HttpContext(req, res);
    return httpContext;
}
