import { IFilter } from "./IFilter";
import { HttpContext, Constants, RestApiConfiguration } from "..";
import { RouteDescriptor } from "../../common";

/**
 * FilterExecuter excutes gloabl and decorated filters
 */
export class FilterExecuter {
    private usedFilters: IFilter[] = [];
    private globalFilters: IFilter[] = [];

    constructor(private context: HttpContext, private routeDescriptor: RouteDescriptor) {
    }

    /**
     * Method to execute filter method beforeActionExceduted
     */
    public executeBeforeActionExceduted() {
        this.usedFilters = Reflect.getMetadata(Constants.metadata.filter, this.context.controllerObject,
            this.routeDescriptor.methodName) || [];

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

    /**
     * Method to execute filter method aftereActionExceduted
     */
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