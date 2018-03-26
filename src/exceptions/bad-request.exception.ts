import { HttpContext } from "../lifecycle";
import { ModelError } from "../common";

/**
 * Expection class to throw bad request 400
 */
export class BadRequestException {
    constructor(context: HttpContext, message: ModelError[]) {
        context.response.type("application/json").status(400).send({ message: message.map(m => m.errorMessage) });
    }
}
