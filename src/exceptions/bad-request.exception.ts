import { HttpContext } from "../infrastructure/http-context";
import { ModelError } from "../common/model/model-error";

export class BadRequestException {
    constructor(context: HttpContext, message: ModelError[]) {
        context.response.type("application/json").status(400).send({ message: message.map(m => m.errorMessage) });
    }
}