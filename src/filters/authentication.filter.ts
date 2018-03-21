import { IAuthentication } from "../infrastructure/IAuthentication";
import { HttpContext } from "../infrastructure/http-context";
import { HttpResponse } from "../infrastructure/http-response";
import { UnAuthenticateException } from "../exceptions/unauthenticate.exception";

export class AuthenticationFilter implements IAuthentication {
    public authenticate(context: HttpContext): boolean | UnAuthenticateException {
        if (context.request.header("Authorization")) {
            return true;
        }
        return new UnAuthenticateException(context);
    }
}