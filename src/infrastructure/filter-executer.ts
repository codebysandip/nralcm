import { RestApiConfiguration } from "./rest-api.configuration";
import { HttpContext } from "./http-context";
import { Constants } from "./rest-api-constants";
import { RouteDescriptor } from "./route-descriptor";
import { IFilter } from "./IFilter";

export class FilterExecuter {
    private usedFilters: IFilter[] = [];
    private globalFilters: IFilter[] = [];

    constructor(private restApiConfiguration: RestApiConfiguration, private context: HttpContext, private routeDescriptor: RouteDescriptor) {
    }

    public executeBeforeActionExceduted() {
        this.usedFilters = Reflect.getMetadata(Constants.metadata.filter, this.context.controllerObject,
            this.routeDescriptor.propertyKey) || [];

        this.globalFilters = this.restApiConfiguration.Filters;

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