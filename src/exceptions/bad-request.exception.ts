import { HttpContext } from "../infrastructure/http-request";

export class BadRequestException {
    constructor(context: HttpContext, message: any) {
        context.response.type("application/json").status(400).send({ message: message });
    }
}