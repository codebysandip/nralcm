import { HttpContext } from "../lifecycle";

/**
 * Expection class to throw handler not found 400
 */
export class HandlerNotFoundException {
    constructor(context: HttpContext) {
        context.response.type("application/json").status(400).json({ message: "There is no handler supported for the request"});
    }
}
