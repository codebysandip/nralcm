import "reflect-metadata";
import { IFilter, Constants } from "../lifecycle";

export function FilterDecorator(filter: IFilter) {
    return function (target: any, propertyKey: string) {
        const existingFilters = Reflect.getMetadata(Constants.metadata.filter, target, propertyKey) as IFilter[] || [];
        existingFilters.push(filter);
        Reflect.defineMetadata(Constants.metadata.filter, existingFilters, target, propertyKey);
    };
}