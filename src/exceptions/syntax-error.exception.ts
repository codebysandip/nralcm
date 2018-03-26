import { HttpContext } from "../lifecycle";

/**
 * Expection class to throw syntax error 400 when body of request is not valid json
 */
export class SyntaxErrorException {
    constructor(context: HttpContext) {
        context.response.type("application/json").status(400).send({ message: "Invalid Json Body" });
    }
}
