import { IFilter, HttpContext } from "../lifecycle";
import { RouteDescriptor } from "../common";

export class TestFilter implements IFilter {
    public beforeActionExceduted(httpContext: HttpContext, routeDescriptor: RouteDescriptor): void {
        console.log("beforeActionExceduted TestFilter", httpContext.user, routeDescriptor);
    }

    public aftereActionExceduted(httpContext: HttpContext, routeDescriptor: RouteDescriptor): void {
        console.log("aftereActionExceduted TestFilter", httpContext.user, routeDescriptor);
    }
}