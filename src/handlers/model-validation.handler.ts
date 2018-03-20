import { IModelValidation } from "../infrastructure/IModelValidation";
import { DependencyInjection } from "../infrastructure/dependency-injection";
import { RouteDescriptor } from "../infrastructure/route-descriptor";
import { HttpContext } from "../infrastructure/http-request";
import { ValidatorData } from "../validators/validator-data";
import { UrlMapper } from "../infrastructure/url-mapper";
import { Constants } from "../infrastructure/rest-api-constants";
import { getMethodParameters } from "../common/get-method-parameters";
import { BadRequestException } from "../exceptions/bad-request.exception";

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

            const errorMessages = Reflect.getMetadata(Constants.metadata.errorMessages, context.controllerObject) as string[];
            if (errorMessages && errorMessages.length) {
                throw new BadRequestException(context, errorMessages);
                // return false;
            }

            if (routeDescriptor && routeDescriptor.descriptor) {
                const dependencyInjection = new DependencyInjection(context);
                const args = Reflect.getMetadata(Constants.metadata.args, context.controllerObject) as any[];
                console.log("args", args);
                const method = routeDescriptor.descriptor.value;
                const data = method.apply(context.controllerObject as Object, args);
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
}