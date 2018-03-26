import { ModelError } from "./model-error";

/**
 * Model to store validation data in meta data of controller object
 */
export interface ValidatorData {
    /**
     * Name of property
     */
    propertyKey: string;

    /**
     * Name of validation
     */
    validator: string;

    /**
     * Display name will be use for sending error. If undefined then propertyKey will be use
     */
    displayName?: string;

    /**
     * error message to be return when validation fails.
     */
    errorMessage?: string;

    /**
     * Validation function. This function will use to validate value
     */
    validate: ValidateFunction|undefined;

    /**
     * Parameter Index will be store when Prameter Decorator validation
     */
    parameterIndex?: number;

    /**
     * Param Name when storing meta data of param error
     */
    paramName?: string;

    /**
     * Param Value when storing meta data of param error
     */
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
    (value: any, validatorData: ValidatorData, type: any): true|ModelError;
}