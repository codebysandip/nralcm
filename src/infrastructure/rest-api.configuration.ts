import { IAuthentication } from "./IAuthentication";
import { IAuthorize } from "./IAuthorize";
import { IExceptionHandler } from "../infrastructure/IExceptionHandler";
import { IAuthHandler } from "../infrastructure/IAuthHandler";
import { ModelValidationHandler } from "../handlers/model-validation.handler";
import { IHttpResponseHandler } from "./IHttpResponseHandler";

export class RestApiConfiguration {
    public authenticationFilter: IAuthentication;
    public authorizeFilter: IAuthorize;
    public exceptionHandler: IExceptionHandler;
    public authHandler: IAuthHandler;
    public modelValidationHandler: ModelValidationHandler;
    public httpResponseHandler: IHttpResponseHandler;
    // public filters: IRestApiFilter[];

    private static config: RestApiConfiguration;

    private constructor() {

    }

    public static getInstance() {
        if (!this.config) {
            this.config = new RestApiConfiguration();
        }
        return this.config;
    }
}