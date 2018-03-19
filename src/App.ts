import * as express from "express";
import { HandlerDispatcher } from "./infrastructure/HandlerDispatcher";
import { RestApiHandler } from "./handlers/rest-api.handler";

class App {
    public express: express.Express;
    public handlerDispatcher: HandlerDispatcher;

    constructor() {
        this.express = express();
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