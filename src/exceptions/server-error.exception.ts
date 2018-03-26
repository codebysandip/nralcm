import { HttpContext } from "../lifecycle";

/**
 * Expection class to throw server error 500
 */
export class ServerErrorException {
    constructor(context: HttpContext) {
        context.response.type("application/json").status(500).send({ message: "Oops! Something went wrong. Please try after sometime."});
    }
}
