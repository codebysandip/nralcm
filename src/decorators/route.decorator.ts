import { IRoute } from "../infrastructure/route";
import "reflect-metadata/Reflect";
import { RouteDescriptor } from "../infrastructure/route-descriptor";
import { routes } from "../app.routes";
import { HttpMethod } from "../infrastructure/http-method.enum";

export function Route(route: string, httpMethod: HttpMethod) {
    return function(target: any, propertyKey: string, descriptor: PropertyDescriptor) {
        const routeDescriptor: RouteDescriptor = {
            route: route,
            descriptor: descriptor,
            propertyKey: propertyKey,
            httpMethod: httpMethod
        };

        // injecting all routes of controller in metadata
        const routeDescriptors: RouteDescriptor[] = Reflect.getMetadata("routes", target) ?
                                                    Reflect.getMetadata("routes", target) : [];
        routeDescriptors.push(routeDescriptor);
        Reflect.defineMetadata("routes", routeDescriptors, target);
    };
}