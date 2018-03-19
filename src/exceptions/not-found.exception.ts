import { HttpContext } from "../infrastructure/http-request";

export class NotFoundException {
    constructor(context: HttpContext) {
        context.response.type("application/json").status(404).send({ message: "No api found"});
    }
}