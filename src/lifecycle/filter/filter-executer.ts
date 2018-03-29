import { IFilter } from "./IFilter";
import { HttpContext, Constants } from "..";
import { RouteDescriptor } from "../../common";

/**
 * FilterExecuter excutes gloabl and decorated filters
 */
export class FilterExecuter {

    constructor(private context: HttpContext, private routeDescriptor: RouteDescriptor, private globalFilters: IFilter[]) {
    }

    private usedFilters: IFilter[] = [];


    /**
     * Method to execute filter method beforeActionExceduted
     */
    public executeBeforeActionExceduted(): void {
        this.usedFilters = Reflect.getMetadata(Constants.metadata.filter, this.context.controllerObject,
            this.routeDescriptor.methodName) || [];

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
    public executeAfterActionExceduted(): void {
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