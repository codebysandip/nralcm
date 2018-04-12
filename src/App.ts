import * as express from "express";
import { HandlerDispatcher, RestApiConfiguration, HttpConfiguration } from "./lifecycle";
import * as bodyparser from "body-parser";
import { Request, Response } from "express-serve-static-core";
import { AppConfig } from "./app-config";

class App {
    public express: express.Express;
    public handlerDispatcher: HandlerDispatcher;
    private restApiConfiguration = new RestApiConfiguration();
    private httpConfiguration: HttpConfiguration = new HttpConfiguration(this.restApiConfiguration);

    constructor() {
        this.express = express();
        this.express.use(bodyparser.json());
        new AppConfig(this.restApiConfiguration).register();

        this.express.use((err: any, req: Request, res: Response, next: any): void|Response => {
            if (err) {
                if (err instanceof SyntaxError) {
                    // console.log("syntax err");
                    return res.type("application/json").status(400).send({ message: "Invalid Json Body" });;
                }
                console.log(err);
                return;
            }
            next();
        });
        this.mountRoutes();
    }

    private mountRoutes(): void {
        const router = express.Router();
        router.all("*", (request, response) => {
            HandlerDispatcher.processHandler(request, response, this.httpConfiguration);
        });

        this.express.use("/", router);
    }
}

export default new App().express;