/**
 * Model to store Params in meta data of controller object
 */
export interface ParamData {
    /**
     * Name of Param
     */
    paramName: string;

    /**
     * Value of Param
     */
    paramValue: string | number | boolean;
}