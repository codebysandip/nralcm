import * as express from "express";
import { HandlerDispatcher } from "./infrastructure/HandlerDispatcher";
import { RestApiHandler } from "./handlers/rest-api.handler";
import * as bodyparser from "body-parser";
import { Request, Response } from "express-serve-static-core";
import { getContext } from "./common/get-context";
import { SyntaxErrorException } from "./exceptions/syntax-error.exception";

class App {
    public express: express.Express;
    public handlerDispatcher: HandlerDispatcher;

    constructor() {
        this.express = express();
        this.express.use(bodyparser.json());

        this.express.use((err: any, req: Request, res: Response, next: any): void => {
            if (err) {
                if (err instanceof SyntaxError) {
                    // console.log("syntax err");
                    new SyntaxErrorException(getContext(req, res));
                    return;
                }
                return;
            }
            next();
        });
        this.handlerDispatcher = HandlerDispatcher.getInstance();
        this.mountRoutes();
    }

    private mountRoutes() {
        this.handlerDispatcher.add("/api/*", new RestApiHandler());
        const router = express.Router();
        router.all("*", (request, response) => {
            this.handlerDispatcher.processHandler(request, response);
        });

        this.express.use("/", router);
    }
}

export default new App().express;