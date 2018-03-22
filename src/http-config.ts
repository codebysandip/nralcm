import { HttpConfiguration } from "./infrastructure/http-configuration";
import { RestApiHandler } from "./handlers/rest-api.handler";

export class HttpConfig {
    public register(config: HttpConfiguration) {
        config.addHandler("/api/*", new RestApiHandler());
    }
}