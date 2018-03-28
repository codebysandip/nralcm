import { getConstructorParameters } from ".";
import "reflect-metadata/Reflect";

/**
 * Method to inject dependency
 * @param target target objectto inject dependency
 * @param source source object which will hold dependency object
 */
export function circularInjection(target: any, source: any): void {
    const constructorParameters = getConstructorParameters(target);
    if (constructorParameters && constructorParameters.length > 0) {
        const constructorParameterTypes: any[] = Reflect.getMetadata("design:paramtypes", target);

        if (constructorParameterTypes && constructorParameterTypes.length === constructorParameters.length) {
            if (constructorParameterTypes && constructorParameterTypes.length > 0) {
                constructorParameterTypes.forEach((val, index) => {
                    source[constructorParameters[index]] = new val();
                });
            }
        } else if (constructorParameters.length !== 0) {
            throw new Error("Unable to resolve dependency. Use Repository decorator to inject dependecy in " + target.name);
        }
    }
}
