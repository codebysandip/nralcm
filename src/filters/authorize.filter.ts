import { IAuthorize } from "../infrastructure/IAuthorize";
import { HttpContext } from "../infrastructure/http-context";
import { HttpResponse } from "../infrastructure/http-response";
import { UnAuthorizeException } from "../exceptions/unauthorize.exception";

export class AuthorizationFilter implements IAuthorize {
    public authorize(context: HttpContext, roles: string[]): boolean|UnAuthorizeException {
        return true;
        // return new UnAuthorizeException(context);
    }
}