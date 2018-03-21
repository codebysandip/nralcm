import { HttpContext } from "../infrastructure/http-context";

export class UnAuthenticateException {
    constructor(context: HttpContext) {
        context.response.type("application/json").status(401).send({ message: "User not Authenicated"});
    }
}