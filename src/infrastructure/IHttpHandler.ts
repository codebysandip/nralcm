import { Request, Response } from "express-serve-static-core";

export interface IHttpHandler {
    processRequest(req: Request, res: Response): void;
}