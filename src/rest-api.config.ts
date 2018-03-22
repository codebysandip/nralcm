import { RestApiConfiguration } from "./infrastructure/rest-api.configuration";
import { AuthenticationFilter } from "./filters/authentication.filter";
import { AuthorizationFilter } from "./filters/authorize.filter";
import { ExceptionHandler } from "./handlers/exception.handler";
import { ModelValidationHandler } from "./handlers/model-validation.handler";
import { HttpResponseHandler } from "./handlers/http-response.handler";
import { TestFilter } from "./filters/test.filter";
import { Test1Filter } from "./filters/test1.filter";

/**
 * Rest Api Configuration class to register
 * filters, handlers etc.
 */
export class RestApiConfig {
    public register(config: RestApiConfiguration) {
        config.AuthenticationFilter = new AuthenticationFilter();
        config.AuthorizeFilter = new AuthorizationFilter();
        config.ExceptionHandler = new ExceptionHandler();
        config.ModelValidationHandler = new ModelValidationHandler();
        config.HttpResponseHandler = new HttpResponseHandler();
        config.addFilter(new TestFilter());
        config.addFilter(new Test1Filter());
    }
}