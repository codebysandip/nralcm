import "reflect-metadata";
import { ValidatorData } from "./validator-data";
const requiredMetadataKey = "validation";

export function Optional(displayName?: string, message?: string) {
    return function (target: Object, propertyKey: string, parameterIndex: number) {
        const validatorData: ValidatorData = {
            propertyKey: propertyKey,
            validator: "Optional",
            displayName: displayName,
            message: message,
            validate: validate,
            parameterIndex: parameterIndex
        };
        // console.log("target", target, parameterIndex, propertyKey);
        const existingOptionalParameters: ValidatorData[] = Reflect.getOwnMetadata(requiredMetadataKey, target, propertyKey) || [];
        existingOptionalParameters.push(validatorData);
        Reflect.defineMetadata(requiredMetadataKey, existingOptionalParameters, target, propertyKey);
    };
}

function validate() {

}