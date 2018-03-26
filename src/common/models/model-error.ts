/**
 * Model to store error while validation of param, query string and request body
 * in meta data of controller object
 */
export interface ModelError {
    /**
     * Name of property
     */
    propertyName: string;

    /**
     * error message to be return when validation fails.
     */
    errorMessage: string;

    /**
     * True when validation fails on type error
     */
    isTypeError: boolean;

    /**
     * Type of propery
     */
    typeOfProperty: Function|undefined;

    /**
     * Type of error
     */
    errorType: "Param"|"QueryString"|"RequestBody";
}