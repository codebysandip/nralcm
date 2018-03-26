import { DependencyInjection } from "../infrastructure/dependency-injection";

export function Repository() {
    return function(target: any) {
        DependencyInjection.inject(undefined, target);
    };
}