import { circularInjection, getConstructorParameters } from ".";

/**
 * Method to check class will able to inject dependency 
 * @param target class to check
 */
export function IsInjectable(target: any) {
    let targetObject: any;
    if (target) {
        targetObject = target;
    } 
    const targetObjectInstance = new targetObject();

    const constructorParameterTypes: any[] = Reflect.getMetadata("design:paramtypes", targetObject);
    if (constructorParameterTypes && constructorParameterTypes.length > 0) {
        const constructorParameters = getConstructorParameters(targetObject);
        constructorParameterTypes.forEach((val: any, index) => {
                targetObjectInstance[constructorParameters[index]] = new val();
                circularInjection(val, targetObjectInstance[constructorParameters[index]]);
        });
    }

}