import "reflect-metadata";
import { ValidatorData } from "./validator-data";

export function Required(displayName?: string, message?: string) {
    return function(target: any, key: string) {
        const validatorData: ValidatorData = {
            propertyKey: key,
            validator: "Required",
            displayName: displayName,
            message: message,
            validate: validate
        };

        const validatorDataArr: ValidatorData[] = Reflect.getMetadata("validation", target) ?
            Reflect.getMetadata("validation", target) as ValidatorData[] : [];
        validatorDataArr.push(validatorData);
        // injection validation metadata in class object
        Reflect.defineMetadata("validation", validatorDataArr, target);
    };
}

export function validate() {

}