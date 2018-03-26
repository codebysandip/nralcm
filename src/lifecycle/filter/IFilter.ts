import { HttpContext } from "..";
import { RouteDescriptor } from "../../common";

export interface IFilter {
    beforeActionExceduted(httpContext: HttpContext, routeDescriptor: RouteDescriptor): void;
    aftereActionExceduted(httpContext: HttpContext, routeDescriptor: RouteDescriptor): void;
}