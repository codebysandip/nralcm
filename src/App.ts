import * as express from "express";
import { HandlerDispatcher } from "./infrastructure/HandlerDispatcher";
import * as bodyparser from "body-parser";
import { Request, Response } from "express-serve-static-core";
import { getContext } from "./common/get-context";
import { nrlcm } from "./infrastructure/exception";
import { HttpConfig } from "./http-config";
import { HttpConfiguration } from "./infrastructure/http-configuration";

class App {
    public express: express.Express;
    public handlerDispatcher: HandlerDispatcher;
    private httpConfig: HttpConfig = new HttpConfig();
    private httpConfiguration: HttpConfiguration = new HttpConfiguration();

    constructor() {
        this.express = express();
        this.express.use(bodyparser.json());
        this.httpConfig.register(this.httpConfiguration);

        this.express.use((err: any, req: Request, res: Response, next: any): void|nrlcm.Exception.SyntaxErrorException => {
            if (err) {
                if (err instanceof SyntaxError) {
                    // console.log("syntax err");
                    return new nrlcm.Exception.SyntaxErrorException(getContext(req, res));
                }
                console.log(err);
                return;
            }
            next();
        });
        this.handlerDispatcher = HandlerDispatcher.getInstance();
        this.mountRoutes();
    }

    private mountRoutes() {
        const router = express.Router();
        router.all("*", (request, response) => {
            this.handlerDispatcher.processHandler(request, response, this.httpConfiguration);
        });

        this.express.use("/", router);
    }
}

export default new App().express;