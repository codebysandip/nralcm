import { DependencyInjection } from "../lifecycle";

/**
 * Decorator for Repository
 */
export function Repository() {
    return function(target: any) {
        DependencyInjection.inject(undefined, target);
    };
}