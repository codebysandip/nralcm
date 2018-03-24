import { HttpContext } from "../infrastructure/http-context";
import { ModelError } from "../common/model/model-error";

export namespace nrlcm {

    export namespace Exception {

        export class HandlerNotFoundException {
            constructor(context: HttpContext) {
                context.response.type("application/json").status(400).json({ message: "There is no handler supported for the request"});
            }
        }

        export class NotFoundException {
            constructor(context: HttpContext) {
                context.response.type("application/json").status(404).send({ message: "No api found"});
            }
        }

        export class BadRequestException {
            constructor(context: HttpContext, message: ModelError[]) {
                context.response.type("application/json").status(400).send({ message: message.map(m => m.errorMessage) });
            }
        }

        export class UnAuthorizeException {
            constructor(context: HttpContext) {
                context.response.type("application/json").status(403).send({ message: "User not Authorize"});
            }
        }

        export class ServerErrorException {
            constructor(context: HttpContext) {
                context.response.type("application/json").status(500).send({ message: "Oops! Something went wrong. Please try after sometime."});
            }
        }

        export class SyntaxErrorException {
            constructor(context: HttpContext) {
                context.response.type("application/json").status(400).send({ message: "Invalid Json Body" });
            }
        }

        export class UnAuthenticateException {
            constructor(context: HttpContext) {
                context.response.type("application/json").status(401).send({ message: "User not Authenicated"});
            }
        }

        export class TokenNotValidException {
            constructor(context: HttpContext) {
                context.response.type("application/json").status(400).send({ message: "Token is not Valid"});
            }
        }
    }
}
