import { IModelValidation } from "../infrastructure/IModelValidation";
import { DependencyInjection } from "../infrastructure/dependency-injection";
import { RouteDescriptor } from "../infrastructure/route-descriptor";
import { HttpContext } from "../infrastructure/http-request";
import { ValidatorData } from "../validators/validator-data";
import { UrlMapper } from "../infrastructure/url-mapper";
import { Constants } from "../infrastructure/rest-api-constants";
import { getMethodParameters } from "../common/get-method-parameters";

export class ModelValidationHandler implements IModelValidation {
    private context: HttpContext;

    /**
     * Validates param, query string and body of request
     * @param context: HttpContext
     * @returns booleans
     */
    public validate(context: HttpContext): boolean {
        this.context = context;
        // const instance = new target();
        const urlParts = this.getUrlParts(context.request.url);
        const url = urlParts.slice(1).join("/");
        // get all routes of controller
        const routeDescriptors: RouteDescriptor[] = Reflect.getMetadata("routes", context.controllerObject as Object);
        if (routeDescriptors && routeDescriptors.length) {

            // matching routes with url
            const routeDescriptor = UrlMapper(routeDescriptors, url, context);

            if (!routeDescriptor) {
                return false;
            }

            if (routeDescriptor && typeof routeDescriptor !== "boolean" && routeDescriptor.descriptor) {

                // get all parameters of api method
                const apiMethodParameters: any[] = Reflect.getMetadata("design:paramtypes", context.controllerObject,
                                                        routeDescriptor.propertyKey);
                if (apiMethodParameters && apiMethodParameters.length) {
                    // console.log("validation", Reflect.getMetadata("validation", context.controllerObject, routeDescriptor.propertyKey));
                    const validateModelResult = this.validateModel(routeDescriptor, context, apiMethodParameters);
                    if (!validateModelResult) {
                        return true;
                    }
                }
                const routeParams = Reflect.getMetadata(Constants.metadata.routeParams, context.controllerObject) as ValidatorData[];
                const dependencyInjection = new DependencyInjection(context);
                const method = routeDescriptor.descriptor.value;
                const data = method.apply(context.controllerObject as Object, routeParams ? routeParams.map(param => param.paramValue) : []);
                context.response.json(data);
                return true;
            }
        }
        return false;
    }

    private getUrlParts(url: string) {
        url = url.substring(url.indexOf("api") + 3);
        url = url.startsWith("/") ? url.substring(1) : url;
        const queryStringIndex = url.indexOf("?");
        if (queryStringIndex > 0) {
            url = url.substring(0, url.indexOf("?"));
        }
        return url ? url.split("/") : [];
    }

    private validateModel(routeDescriptor: RouteDescriptor, context: HttpContext, apiMethodParameters: any[]): boolean {
        // get all validation data
        const methodParameters: string[] = getMethodParameters(routeDescriptor.descriptor.value, routeDescriptor.propertyKey);
        // apiMethodParameters.forEach(val => {
        //     const validationData = Reflect.getMetadata("validation", new val());
        //     this.getMethodParameters(routeDescriptor.descriptor.value, routeDescriptor.propertyKey);
        //     // console.log("validationData", validationData);
        // });
        return true;
    }

    private validateParams(args: string[], target: Object) {
        if (this.context.controller) {
            const params: ValidatorData[] = Reflect.getMetadata(Constants.metadata.routeParams, this.context.controller);
            console.log("params", params);
        }
    }
}