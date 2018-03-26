import { DependencyInjection } from "../lifecycle";

export function Repository() {
    return function(target: any) {
        DependencyInjection.inject(undefined, target);
    };
}