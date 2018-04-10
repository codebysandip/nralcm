import { RestApiConfiguration } from "./lifecycle";
import { AuthenticationFilter } from "./filters/authentication.filter";
import { AuthorizationFilter } from "./filters/authorize.filter";
// import { GlobalFilter } from "./filters/global.filter";
import { routes } from "./app.routes";

export class AppConfig {
    constructor (private restApiConfiguration: RestApiConfiguration) {
    }
    public register(): void {
        this.restApiConfiguration.AuthenticationFilter = new AuthenticationFilter();
        this.restApiConfiguration.AuthorizeFilter = new AuthorizationFilter();
        // this.restApiConfiguration.addFilter(new GlobalFilter());
        this.restApiConfiguration.addRoutes(routes);
    }

    public static secret: string = "2026a72a-0d1b-4c16-8394-c72c23a0fc2c";
}