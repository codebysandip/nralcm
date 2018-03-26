import { HttpMethod } from "../enums";

/**
 * Model to store meta data of controller's api methods in meta data of controller object
 */
export interface RouteDescriptor {
    /**
     * Route string of api method
     */
    route: string;

    /**
     * PropertyDescriptor of api method
     */
    descriptor: PropertyDescriptor;

    /**
     * Name of api Method
     */
    methodName: string;

    /**
     * Rest Verb
     */
    httpMethod: HttpMethod;
}