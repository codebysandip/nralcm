import "reflect-metadata/Reflect";
import { DependencyInjection } from "../lifecycle";
/**
 * Decorator for Authentication and Authorization
 * @param roles Roles array (string)
 */
export function Authorize(roles?: string[]) {
    return function (target: any, propertyKey?: string, descriptor?: PropertyDescriptor) {
        if (propertyKey && descriptor) {
            Reflect.defineMetadata("authorize", { roles: roles }, target, propertyKey);
        } else {
            const targetString = target.toString() as string;
            const baseControllerIndex = targetString.indexOf("BaseController");
            if (baseControllerIndex > 0 && targetString.indexOf("BaseController") < targetString.indexOf("{")) {
                DependencyInjection.inject(undefined, target);
                Reflect.defineMetadata("authorize", { roles: roles }, target);
            } else {
                throw new Error(`${target.name} must extend with BaseController`);
            }
        }
    };
}