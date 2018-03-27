import "reflect-metadata/Reflect";
import { HttpContext, HttpResponse } from "..";

/**
 * Resolves Dependency Of controller
 */
export class DependencyInjection {
    private static context: HttpContext;

    /**
     * Method to inject depedency
     * @param context HttpContext Object in case when resolving dependency of controller. undefined when resolving dependency of class
     * @param target class object when HttpContext undefined
     */
    public static inject(context: HttpContext|undefined, target?: any): void {
        let targetObject: any;
        if (context) {
            this.context = context;
            targetObject = this.context.controller;
        } else if (target) {
            targetObject = target;
        } else {
            throw new Error("HttpContext and target both cannot be null or undefined");
        }
        const targetObjectInstance = new targetObject();

        const constructorParameterTypes: any[] = Reflect.getMetadata("design:paramtypes", targetObject);
        if (constructorParameterTypes && constructorParameterTypes.length > 0) {
            const constructorParameters = this.getConstructorParameters(targetObject);
            constructorParameterTypes.forEach((val: any, index) => {
                    targetObjectInstance[constructorParameters[index]] = new val();
                    this.circularInjection(val, targetObjectInstance[constructorParameters[index]]);
            });
            if (context) {
                targetObjectInstance["request"] = this.context.request;
                targetObjectInstance["response"] = new HttpResponse(this.context);
                context.controllerObject = targetObjectInstance;
            }
        }
    }

    /**
     * Method to inject dependency
     * @param target target objectto inject dependency
     * @param source source object which will hold dependency object
     */
    private static circularInjection(target: any, source: any): void {
        const constructorParameters = this.getConstructorParameters(target);
        if (constructorParameters && constructorParameters.length > 0) {
            const constructorParameterTypes: any[] = Reflect.getMetadata("design:paramtypes", target);

            if (constructorParameterTypes && constructorParameterTypes.length === constructorParameters.length) {
                if (constructorParameterTypes && constructorParameterTypes.length > 0) {
                    constructorParameterTypes.forEach((val, index) => {
                        source[constructorParameters[index]] = new val();
                    });
                }
            } else {
                throw new Error("Unable to resolve dependency. Use Repository decorator to inject dependecy in " + target.name);
            }
        }
    }

    /**
     * Method to get constructor parameter names
     * @param target class Object
     */
    private static getConstructorParameters(target: any): string[] {
        const classString = target.toString() as string;
        let constructorParameters: string[] = [];
        const constructorIndex = classString.indexOf("constructor");
        if (classString && constructorIndex !== -1) {
            let args = classString.substr(constructorIndex);
            args = args.substring(args.indexOf("(") + 1, args.indexOf(")"));
            constructorParameters = args.replace(/ /g, "").split(",");
        }
        return constructorParameters;
    }
}