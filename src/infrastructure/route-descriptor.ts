import { HttpMethod } from "./http-method.enum";

export interface RouteDescriptor {
    route: string;
    descriptor: PropertyDescriptor;
    propertyKey: string;
    httpMethod: HttpMethod;
}