import { IAuthentication } from "../infrastructure/IAuthentication";
import { HttpContext } from "../infrastructure/http-context";
import * as jwt from "jsonwebtoken";
import { Constants } from "../infrastructure/rest-api-constants";
import { TokenData } from "../models/token-data";
import { MyAuthPrinciple } from "../infrastructure/my-AuthPrinciple";
import { nrlcm } from "../infrastructure/exception";

/**
 * Authentication for authentication of request
 */
export class AuthenticationFilter implements IAuthentication {

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
                    const tokenData: TokenData = jwt.verify(tokenparts[1], Constants.secret) as TokenData;
                    context.user = new MyAuthPrinciple(tokenData.Email, tokenData.Role);
                } catch {
                    throw new nrlcm.Exception.TokenNotValidException(context);
                }
                return true;
            }
            return false;
        }
        return false;
    }
}