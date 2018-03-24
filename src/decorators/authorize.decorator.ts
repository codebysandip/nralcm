import "reflect-metadata/Reflect";
/**
 * Decorator for Authentication and Authorization
 * @param roles Roles array (string)
 */
export function Authorize(roles?: string[]) {
    return function (target: any, propertyKey?: string, descriptor?: PropertyDescriptor) {
        if (propertyKey && descriptor) {
            Reflect.defineMetadata("authorize", { roles: roles}, target, propertyKey);
        } else {
            Reflect.defineMetadata("authorize", { roles: roles}, target);
        }
        // console.log("target", target)
    };
}