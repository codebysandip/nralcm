import { HttpContext } from "../../lifecycle";
import { Request, Response } from "express-serve-static-core";

/**
 * Get HttpContext object
 * @param req Request Object
 * @param res Response Object
 * @returns HttpContext object
 */
export function getContext(req: Request, res: Response): HttpContext {
    const httpContext: HttpContext = new HttpContext(req, res);
    return httpContext;
}
