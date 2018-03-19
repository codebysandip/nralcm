import { IAuthentication } from "./IAuthentication";
import { IAuthorize } from "./IAuthorize";
import { IExceptionHandler } from "../infrastructure/IExceptionHandler";
import { IAuthHandler } from "../infrastructure/IAuthHandler";
import { ModelValidationHandler } from "../handlers/model-validation.handler";

export class RestApiConfiguration {
    public authenticationFilter: IAuthentication;
    public authorizeFilter: IAuthorize;
    public exceptionHandler: IExceptionHandler;
    public authHandler: IAuthHandler;
    public modelValidationHandler: ModelValidationHandler;
}