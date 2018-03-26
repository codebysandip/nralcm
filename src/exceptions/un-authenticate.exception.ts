import { HttpContext } from "../lifecycle";

/**
 * Expection class to throw UnAuthenticate 401
 */
export class UnAuthenticateException {
    constructor(context: HttpContext) {
        context.response.type("application/json").status(401).send({ message: "User not Authenicated"});
    }
}
