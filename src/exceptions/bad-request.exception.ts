import { HttpContext } from "../infrastructure/http-context";

export class BadRequestException {
    constructor(context: HttpContext, message: any) {
        context.response.type("application/json").status(400).send({ message: message });
    }
}