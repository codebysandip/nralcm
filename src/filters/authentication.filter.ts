import * as jwt from "jsonwebtoken";
import { TokenData } from "../models/token-data";
import { AppConfig } from "../app-config";
import { IAuthenticate, HttpContext } from "../lifecycle";
import { TokenNotValidException } from "../exceptions";
import { JwtAuthPrinciple } from "../infrastructure/jwt-AuthPrinciple";

/**
 * Authentication for authentication of request
 */
export class AuthenticationFilter implements IAuthenticate {

    /**
     * Method for check authentication of request
     * @param context HttpContext Object
     * @returns true, If not authenticated throws UnAuthenticateException
     */
    public authenticate(context: HttpContext): boolean {
        const authorizationHeader = context.request.header("Authorization");
        if (authorizationHeader) {
            const tokenparts = authorizationHeader.split(" ");
            if (tokenparts[0] === "Bearer") {
                try {
                    const tokenData: TokenData = jwt.verify(tokenparts[1], AppConfig.secret) as TokenData;
                    context.user = new JwtAuthPrinciple(tokenData.Email, tokenData.Role);
                } catch {
                    throw new TokenNotValidException();
                }
                return true;
            }
            return false;
        }
        return false;
    }
}