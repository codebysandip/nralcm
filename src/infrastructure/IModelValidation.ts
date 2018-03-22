import { HttpContext } from "../infrastructure/http-context";
import { RouteDescriptor } from "./route-descriptor";

/**
 * Inferface for implemenation of model validation
 */
export interface IModelValidation {
    /**
     * Validates params, query string and request body
     * @param context HttpContext Object
     * @param routeDescriptor RouteDescriptor Object
     * @returns Array of error message
     */
    validate(context: HttpContext, routeDescriptor: RouteDescriptor): string[];
}