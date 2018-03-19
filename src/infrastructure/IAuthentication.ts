import { Request, Response } from "express";
import { HttpContext } from "./http-request";
import { HttpResponse } from "./http-response";
import { UnAuthenticateException } from "../exceptions/unauthenticate.exception";

export interface IAuthentication {
    authenticate(context: HttpContext): boolean | UnAuthenticateException;
}