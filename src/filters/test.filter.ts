import { IFilter, HttpContext } from "../lifecycle";
import { RouteDescriptor } from "../common";

export class TestFilter implements IFilter {
    public beforeActionExceduted(httpContext: HttpContext, routeDescriptor: RouteDescriptor): void {
        routeDescriptor.route = "TestFilter-beforeActionExceduted " + httpContext.controllerObject.constructor.name;
    }

    public aftereActionExceduted(httpContext: HttpContext, routeDescriptor: RouteDescriptor): void {
        routeDescriptor.route = "TestFilter-aftereActionExceduted " + httpContext.controllerObject.constructor.name;
    }
}