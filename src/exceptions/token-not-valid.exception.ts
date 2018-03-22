import { HttpContext } from "../infrastructure/http-context";

export class TokenNotValidException {
    constructor(context: HttpContext) {
        context.response.type("application/json").status(400).send({ message: "Token is not Valid"});
    }
}