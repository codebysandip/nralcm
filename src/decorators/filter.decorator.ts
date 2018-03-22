import { IFilter } from "../infrastructure/IFilter";
import "reflect-metadata";
import { Constants } from "../infrastructure/rest-api-constants";

export function FilterDecorator(filter: IFilter) {
    return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
        const existingFilters = Reflect.getMetadata(Constants.metadata.filter, target, propertyKey) as IFilter[] || [];
        existingFilters.push(filter);
        Reflect.defineMetadata(Constants.metadata.filter, existingFilters, target, propertyKey);
    };
}