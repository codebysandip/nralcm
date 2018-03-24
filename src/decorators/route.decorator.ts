import "reflect-metadata/Reflect";
import { RouteDescriptor } from "../infrastructure/route-descriptor";
import { HttpMethod } from "../infrastructure/http-method.enum";
import { getMethodParameters } from "../common/get-method-parameters";

/**
 * Route Decorator to define routes in controller
 * @param httpMethod HttpMethod of api
 * @param route route string for api method
 */
export function Route(httpMethod: HttpMethod, route?: string) {
    return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
        if (route && route.indexOf("{") >= 0 && route.indexOf("}") >= 0) {
            const routeParts = route.startsWith("/") ? route.substring(1).split("/") : route.split("/");
            const methodParameters = getMethodParameters(descriptor.value, propertyKey);

            routeParts.forEach(ro => {
                const openCurlyBraceIndex = ro.indexOf("{");
                const closeCurlyBraceIndex = ro.indexOf("}");
                if (openCurlyBraceIndex >= 0 && closeCurlyBraceIndex >= 0) {
                    const paramName = ro.substring(openCurlyBraceIndex + 1, closeCurlyBraceIndex);
                    if (methodParameters.findIndex(p => p === paramName) === -1) {
                        throw new Error(`Paramerter ${paramName} is missing in method ${propertyKey}`);
                    }
                }
            });
        }
        if (httpMethod === HttpMethod.GET) {
            const methodParametersType = <Function[]> Reflect.getMetadata("design:paramtypes", target, propertyKey);

            if (methodParametersType && methodParametersType.length) {
                methodParametersType.forEach(type => {
                    if (!(type.name === "Number" || type.name === "String" || type.name === "Boolean")) {
                        throw new Error(`Get request method ${propertyKey} cannot have ${type.name} as parameter`);
                    }
                });
            }
        }
        const routeDescriptor: RouteDescriptor = {
            route: route || "",
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