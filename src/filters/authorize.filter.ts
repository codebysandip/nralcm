import { IAuthorize, HttpContext } from "../lifecycle";

export class AuthorizationFilter implements IAuthorize {
    /**
     * Method for check authorization of request
     * @param context HttpContext Object
     * @param roles Roles for access of api
     */
    public authorize(context: HttpContext, roles: string[]): boolean {
        return context.user.isAuthorized(roles);
    }
}