import { HttpContext } from "../infrastructure/http-request";

export class UnAuthorizeException {
    constructor(context: HttpContext) {
        context.response.type("application/json").status(403).send({ message: "User not Authorize"});
    }
}