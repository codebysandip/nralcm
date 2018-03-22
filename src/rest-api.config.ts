import { RestApiConfiguration } from "./infrastructure/rest-api.configuration";
import { AuthenticationFilter } from "./filters/authentication.filter";
import { AuthorizationFilter } from "./filters/authorize.filter";
import { ExceptionHandler } from "./handlers/exception.handler";
import { ModelValidationHandler } from "./handlers/model-validation.handler";
import { HttpResponseHandler } from "./handlers/http-response.handler";

/**
 * Rest Api Configuration class to register
 * filters, handlers etc.
 */
export class RestApiConfig {
    public register(config: RestApiConfiguration) {
        config.setAuthenticationFilter(new AuthenticationFilter());
        config.setAuthorizeFilter(new AuthorizationFilter());
        config.setExceptionHandler(new ExceptionHandler());
        config.setModelValidationHandler(new ModelValidationHandler());
        config.setHttpResponseHandler(new HttpResponseHandler());
    }
}