import { HttpContext } from "..";
import { RouteDescriptor, ModelError } from "../../common";

/**
 * Inferface for implemenation of model validation
 */
export interface IModelValidation {
    /**
     * Validates params, query string and request body
     * @param context HttpContext Object
     * @param routeDescriptor RouteDescriptor Object
     * @returns Array of ModelError
     */
    validate(context: HttpContext, routeDescriptor: RouteDescriptor): ModelError[];
}