import { HttpContext } from "..";
import { RouteDescriptor } from "../../common";

/**
 * Interface to implement Custom filters
 */
export interface IFilter {
    /**
     * Executes before api method
     * @param httpContext HttpContext Object
     * @param routeDescriptor RouteDescriptor data
     */
    beforeActionExceduted(httpContext: HttpContext, routeDescriptor: RouteDescriptor): void;

    /**
     * Executes after api method
     * @param httpContext HttpContext Object
     * @param routeDescriptor RouteDescriptor data
     */

    aftereActionExceduted(httpContext: HttpContext, routeDescriptor: RouteDescriptor): void;
}