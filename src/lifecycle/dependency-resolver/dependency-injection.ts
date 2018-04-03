import "reflect-metadata/Reflect";
import { HttpContext, HttpResponse } from "..";
import { getConstructorParameters, circularInjection } from "../../common/functions";

/**
 * Resolves Dependency Of controller
 */
export class DependencyInjection {

    constructor(private context: HttpContext, private httpResponse: HttpResponse) {
    }

    /**
     * Method to inject depedency
     * @param context HttpContext Object in case when resolving dependency of controller. undefined when resolving dependency of class
     * @param target class object when HttpContext undefined
     */
    public inject(): void {
        let targetObject: any = this.context.controller;

        const constructorParameterTypes: any[] = Reflect.getMetadata("design:paramtypes", targetObject);
        if (constructorParameterTypes && constructorParameterTypes.length > 0) {
            const constructorParameters = getConstructorParameters(targetObject);
            constructorParameterTypes.forEach((val: any, index) => {
                this.context.controllerObject[constructorParameters[index]] = new val();
                circularInjection(val, this.context.controllerObject[constructorParameters[index]]);
            });
        }
        this.context.controllerObject["request"] = this.context.request;
        this.context.controllerObject["response"] = this.httpResponse;

    }
}