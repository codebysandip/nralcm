import { HttpContext } from "../infrastructure/http-context";
export interface IModelValidation {
    validate(context: HttpContext): boolean;
}