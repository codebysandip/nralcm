import { IFilter } from "./IFilter";
import { HttpContext, Constants, RestApiConfiguration } from "..";
import { RouteDescriptor } from "../../common";

export class FilterExecuter {
    private usedFilters: IFilter[] = [];
    private globalFilters: IFilter[] = [];

    constructor(private context: HttpContext, private routeDescriptor: RouteDescriptor) {
    }

    public executeBeforeActionExceduted() {
        this.usedFilters = Reflect.getMetadata(Constants.metadata.filter, this.context.controllerObject,
            this.routeDescriptor.propertyKey) || [];

        this.globalFilters = RestApiConfiguration.Filters;

        this.globalFilters.forEach(filter => {
            filter.beforeActionExceduted(this.context, this.routeDescriptor);
        });
        if (this.usedFilters.length) {
            this.usedFilters.forEach(filter => {
                filter.beforeActionExceduted(this.context, this.routeDescriptor);
            });
        }
    }

    public executeAfterActionExceduted() {
        this.globalFilters.forEach(filter => {
            filter.aftereActionExceduted(this.context, this.routeDescriptor);
        });

        if (this.usedFilters.length) {
            this.usedFilters.forEach(filter => {
                filter.aftereActionExceduted(this.context, this.routeDescriptor);
            });
        }
    }

}