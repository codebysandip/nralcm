
export interface ValidatorData {
    propertyKey: string;
    validator: string;
    displayName?: string;
    message?: string;
    validate: Function;
    parameterIndex?: number;
    paramName?: string;
    paramValue?: any;
}