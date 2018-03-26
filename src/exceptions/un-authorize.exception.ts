import { HttpContext } from "../lifecycle";

/**
 * Expection class to throw UnAuthorized 403
 */
export class UnAuthorizeException {
    constructor(context: HttpContext) {
        context.response.type("application/json").status(403).send({ message: "User not Authorize"});
    }
}
