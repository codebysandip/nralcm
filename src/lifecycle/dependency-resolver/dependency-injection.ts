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
        const targetObjectInstance = new targetObject();

        const constructorParameterTypes: any[] = Reflect.getMetadata("design:paramtypes", targetObject);
        if (constructorParameterTypes && constructorParameterTypes.length > 0) {
            const constructorParameters = getConstructorParameters(targetObject);
            constructorParameterTypes.forEach((val: any, index) => {
                targetObjectInstance[constructorParameters[index]] = new val();
                circularInjection(val, targetObjectInstance[constructorParameters[index]]);
            });
            targetObjectInstance["request"] = this.context.request;
            targetObjectInstance["response"] = this.httpResponse;
            this.context.controllerObject = targetObjectInstance;
        }
    }
}