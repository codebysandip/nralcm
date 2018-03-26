import { HttpContext } from "../lifecycle";

/**
 * Expection class to throw token not valid 401
 */
export class TokenNotValidException {
    constructor(context: HttpContext) {
        context.response.type("application/json").status(401).send({ message: "Token is not Valid"});
    }
}
