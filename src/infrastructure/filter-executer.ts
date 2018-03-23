import { RestApiConfiguration } from "./rest-api.configuration";
import { HttpContext } from "./http-context";
import { Constants } from "./rest-api-constants";
import { RouteDescriptor } from "./route-descriptor";
import { IFilter } from "./IFilter";

export class FilterExecuter {
    private matchedFilters: IFilter[] = [];
    private usedFilters: IFilter[] = [];

    constructor (private restApiConfiguration: RestApiConfiguration, private context: HttpContext, private routeDescriptor: RouteDescriptor) {

    }

    public executeBeforeActionExceduted() {
        this.usedFilters = Reflect.getMetadata(Constants.metadata.filter, this.context.controllerObject,
                                        this.routeDescriptor.propertyKey) || [];

        if (this.usedFilters.length) {
            const registeredFilters = this.restApiConfiguration.Filters;

            this.usedFilters.forEach(filter => {
                const matchedFilter = registeredFilters.find(f => f.constructor.name === filter.constructor.name);
                if (matchedFilter) {
                    this.matchedFilters.push(matchedFilter);
                    matchedFilter.beforeActionExceduted(this.context, this.routeDescriptor);
                }
            });
        }
    }

    public executeAfterActionExceduted() {

        if (this.usedFilters.length) {
            this.matchedFilters.forEach(matchedFilter => {
                if (matchedFilter) {
                    this.matchedFilters.push(matchedFilter);
                    matchedFilter.aftereActionExceduted(this.context, this.routeDescriptor);
                }
            });
        }
    }

}