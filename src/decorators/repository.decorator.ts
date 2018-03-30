import { IsInjectable } from "../common/functions";

/**
 * Decorator for Repository
 */
export function Repository() {
    return function(target: any) {
        IsInjectable(target);
    };
}