import { RestApiConfiguration } from "./infrastructure/rest-api.configuration";
import { AuthenticationFilter } from "./filters/authentication.filter";
import { AuthorizationFilter } from "./filters/authorize.filter";
import { ExceptionHandler } from "./handlers/exception.handler";
import { AuthHandler } from "./handlers/auth.handler";
import { ModelValidationHandler } from "./handlers/model-validation.handler";

export class RestApiConfig {
    public register(config: RestApiConfiguration) {
        config.authenticationFilter = new AuthenticationFilter();
        config.authorizeFilter = new AuthorizationFilter();
        config.exceptionHandler = new ExceptionHandler();
        config.authHandler = new AuthHandler();
        config.modelValidationHandler = new ModelValidationHandler();
    }
}