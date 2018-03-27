import { HttpConfiguration, RestApiConfiguration, ExceptionHandler, ModelValidationHandler } from "./lifecycle";
import { AuthenticationFilter } from "./filters/authentication.filter";
import { AuthorizationFilter } from "./filters/authorize.filter";
import { GlobalFilter } from "./filters/global.filter";
import { routes } from "./app.routes";
import { RestApiHandler } from "./lifecycle";

export class AppConfig {
    public static register(): void {
        HttpConfiguration.addHandler("/api/*", new RestApiHandler());

        RestApiConfiguration.AuthenticationFilter = new AuthenticationFilter();
        RestApiConfiguration.AuthorizeFilter = new AuthorizationFilter();
        RestApiConfiguration.ExceptionHandler = new ExceptionHandler();
        RestApiConfiguration.ModelValidationHandler = new ModelValidationHandler();
        RestApiConfiguration.addFilter(new GlobalFilter());
        RestApiConfiguration.addRoutes(routes);
    }

    public static secret: string = "2026a72a-0d1b-4c16-8394-c72c23a0fc2c";
}