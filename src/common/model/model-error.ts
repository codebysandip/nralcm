export interface ModelError {
    propertyName: string;
    errorMessage: string;
    isTypeError: boolean;
    typeOfProperty: Function|undefined;
    errorType: "Param"|"QueryString"|"RequestBody";
}