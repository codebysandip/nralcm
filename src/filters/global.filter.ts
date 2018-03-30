import { IFilter, HttpContext } from "../lifecycle";
import { RouteDescriptor } from "../common";

export class GlobalFilter implements IFilter {
    public beforeActionExceduted(httpContext: HttpContext, routeDescriptor: RouteDescriptor): void {
        console.log("beforeActionExceduted GlobalFilter", httpContext.user, routeDescriptor);
    }

    public aftereActionExceduted(httpContext: HttpContext, routeDescriptor: RouteDescriptor): void {
        console.log("aftereActionExceduted GlobalFilter", httpContext.user, routeDescriptor);
    }
}