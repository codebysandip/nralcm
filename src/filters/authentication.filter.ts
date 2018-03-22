import { IAuthentication } from "../infrastructure/IAuthentication";
import { HttpContext } from "../infrastructure/http-context";

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
        if (context.request.header("Authorization")) {
            return true;
        }
        return false;
    }
}