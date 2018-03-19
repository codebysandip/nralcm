import "reflect-metadata/Reflect";

export function Authorize(roles: string[]) {
    return function (target: any) {
        Reflect.defineMetadata("authorize", { roles: roles}, target);
        // console.log("target", target)
    };
}