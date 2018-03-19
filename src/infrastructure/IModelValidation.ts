import { HttpContext } from "../infrastructure/http-request";
export interface IModelValidation {
    validate(context: HttpContext): boolean;
}