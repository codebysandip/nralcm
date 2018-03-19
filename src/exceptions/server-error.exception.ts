import { HttpContext } from "../infrastructure/http-request";

export class ServerErrorException {
    constructor(context: HttpContext) {
        context.response.type("application/json").status(500).send({ message: "Oops! Something went wrong. Please try after sometime."});
    }
}