import { HttpMethod } from "./http-method.enum";

/**
 * RouteDescriptor holds meta data of controller api methods
 */
export interface RouteDescriptor {
    route: string;
    descriptor: PropertyDescriptor;
    propertyKey: string;
    httpMethod: HttpMethod;
}