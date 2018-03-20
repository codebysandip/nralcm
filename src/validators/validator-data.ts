
export interface ValidatorData {
    propertyKey: string;
    validator: string;
    displayName?: string;
    message?: string;
    validate?: ValidateFunction;
    parameterIndex?: number;
    paramName?: string;
    paramValue?: any;
}

/**
 * Validate Function
 * @param value - value of class property
 * @param validatorData meta data of property
 * @param type instance of class
 * @returns true or error message
 */
export interface ValidateFunction {
    (value: any, validatorData: ValidatorData, type: any): true|string;
}