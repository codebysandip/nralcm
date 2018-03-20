import { HttpContext } from "../infrastructure/http-request";

export class SyntaxErrorException {
    constructor(context: HttpContext) {
        context.response.type("application/json").status(400).send({ message: "Invalid Json Body" });
    }
}