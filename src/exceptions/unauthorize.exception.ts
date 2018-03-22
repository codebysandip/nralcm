import { HttpContext } from "../infrastructure/http-context";

export class UnAuthorizeException {
    constructor(context: HttpContext) {
        context.response.type("application/json").status(403).send({ message: "User not Authorize"});
    }
}