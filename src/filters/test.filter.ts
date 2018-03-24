import { IFilter } from "../infrastructure/IFilter";
import { HttpContext } from "../infrastructure/http-context";
import { RouteDescriptor } from "../infrastructure/route-descriptor";

export class TestFilter implements IFilter {
    public beforeActionExceduted(httpContext: HttpContext, routeDescriptor: RouteDescriptor): void {
        console.log("beforeActionExceduted TestFilter", httpContext.user, routeDescriptor);
    }

    public aftereActionExceduted(httpContext: HttpContext, routeDescriptor: RouteDescriptor): void {
        console.log("aftereActionExceduted TestFilter", httpContext.user, routeDescriptor);
    }
}