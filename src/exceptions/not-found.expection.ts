import { HttpContext } from "../lifecycle";

/**
 * Expection class to throw not found 404 when route not found
 */
export class NotFoundException {
    constructor(context: HttpContext) {
        context.response.type("application/json").status(404).send({ message: "No api found"});
    }
}
