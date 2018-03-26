import "reflect-metadata/Reflect";
import { HttpContext } from "./http-context";
import { HttpResponse } from "./http-response";
import { RestApiConfiguration } from "./rest-api.configuration";

/**
 * Resolves Dependency Of controller
 */
export class DependencyInjection {
    private static context: HttpContext;

    public static inject(context: HttpContext) {
        this.context = context;
        const constructorParameterTypes: any[] = Reflect.getMetadata("design:paramtypes", this.context.controller);
        if (constructorParameterTypes && constructorParameterTypes.length > 0) {
            const constructorParameters = this.getConstructorParameters(this.context.controller);
            constructorParameterTypes.forEach((val: any, index) => {
                    this.context.controllerObject[constructorParameters[index]] = new val();
                    this.circularInjection(val, this.context.controllerObject[constructorParameters[index]]);
            });
            this.context.controllerObject["request"] = this.context.request;
            this.context.controllerObject["response"] = new HttpResponse(RestApiConfiguration.getInstance().HttpResponseHandler,
                                                                this.context);
        }
    }

    private static circularInjection(target: any, source: any) {
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

    private static getConstructorParameters(target: any) {
        const classString = target.toString() as string;
        let constructorParameters: string[] = [];
        if (classString) {
            let args = classString.substr(classString.indexOf("constructor"));
            args = args.substring(args.indexOf("(") + 1, args.indexOf(")"));
            constructorParameters = args.replace(/ /g, "").split(",");
        }
        return constructorParameters;
    }
}