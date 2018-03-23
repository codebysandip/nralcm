import "reflect-metadata";
import { ValidatorData } from "./validator-data";
import { isValidType } from "../common/check-valid-type";
import { ModelError } from "../common/model/model-error";

export function Required(displayName?: string, message?: string) {
    return function(target: any, key: string) {
        const validatorData: ValidatorData = {
            propertyKey: key,
            validator: "Required",
            displayName: displayName,
            message: message,
            validate: RequiredValidate
        };

        const validatorDataArr: ValidatorData[] = Reflect.getMetadata("validation", target) ?
            Reflect.getMetadata("validation", target) as ValidatorData[] : [];
        validatorDataArr.push(validatorData);
        // injection validation metadata in class object
        Reflect.defineMetadata("validation", validatorDataArr, target);
    };
}

/**
 * Validates instance property for required
 * @param value - value of class property
 * @param validatorData meta data of property
 * @param type instance of class
 * @returns true or error message
 */
export function RequiredValidate(value: any, validatorData: ValidatorData, type: any): ModelError|true {
    if (value.toString()) {
        const typeOfValue = Reflect.getMetadata("design:type", type, validatorData.propertyKey) as Function;
        if (!isValidType(typeOfValue, value)) {
            const modelError: ModelError = {
                propertyName: validatorData.propertyKey,
                errorMessage: `Parameter ${validatorData.propertyKey} is not valid value '${value} for type ${typeOfValue.name}'`,
                isTypeError: true,
                typeOfProperty: typeOfValue,
                errorType: "RequestBody"
            };
            return modelError;
        }
        return true;
    } else {
        if (validatorData.message) {
            const modelError: ModelError = {
                propertyName: validatorData.propertyKey,
                errorMessage: validatorData.message,
                isTypeError: false,
                typeOfProperty: Reflect.getMetadata("design:type", type, validatorData.propertyKey) as Function,
                errorType: "RequestBody"
            };
            return modelError;
        } else {
            const modelError: ModelError = {
                propertyName: validatorData.propertyKey,
                errorMessage: `${validatorData.displayName || validatorData.propertyKey} is required`,
                isTypeError: false,
                typeOfProperty: Reflect.getMetadata("design:type", type, validatorData.propertyKey) as Function,
                errorType: "RequestBody"
            };
            return modelError;
        }
    }
}