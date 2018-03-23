import { HttpContext } from "./http-context";
import { RouteDescriptor } from "./route-descriptor";

export interface IFilter {
    beforeActionExceduted(httpContext: HttpContext, routeDescriptor: RouteDescriptor): void;
    aftereActionExceduted(httpContext: HttpContext, routeDescriptor: RouteDescriptor): void;
}