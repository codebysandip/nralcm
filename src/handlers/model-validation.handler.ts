import { IModelValidation } from "../infrastructure/IModelValidation";
import { RouteDescriptor } from "../infrastructure/route-descriptor";
import { HttpContext } from "../infrastructure/http-context";
import { Constants } from "../infrastructure/rest-api-constants";
import { getMethodParameters } from "../common/get-method-parameters";
import { ValidatorData } from "../validators/validator-data";
import { ParamData } from "../common/model/param-data";
import { QueryString } from "../infrastructure/query-string";
import { isValidType } from "../common/check-valid-type";
import { HttpMethod } from "../infrastructure/http-method.enum";

export class ModelValidationHandler implements IModelValidation {

    /**
     * Validates params, query string and request body
     * @param context HttpContext Object
     * @param routeDescriptor RouteDescriptor Object
     * @returns Array of error message
     */
    public validate(context: HttpContext, routeDescriptor: RouteDescriptor): string[] {
        const errorMessages = this.validateParamsAndQueryWithMethodParameters(context, routeDescriptor);
        const existingErrorMessages = Reflect.getMetadata(Constants.metadata.errorMessages, context.controllerObject) as string[] || [];

        return [...errorMessages, ...existingErrorMessages];

        // if (routeDescriptor && routeDescriptor.descriptor) {
        //     new DependencyInjection(context);
        //     const args = Reflect.getMetadata(Constants.metadata.args, context.controllerObject) as any[];
        //     const method = routeDescriptor.descriptor.value;
        //     const data = method.apply(context.controllerObject as Object, args);
        //     if (!(data instanceof ServerResponse)) {
        //         context.response.json(data);
        //     }
        //     return true;
        // }
    }

    private validateParamsAndQueryWithMethodParameters(context: HttpContext, routeDescriptor: RouteDescriptor): string[] {
        const methodParameterTypes = Reflect.getMetadata("design:paramtypes", context.controllerObject,
            routeDescriptor.propertyKey) as Function[];
        const methodParameters = getMethodParameters(context.controller, routeDescriptor.propertyKey);
        const validationMetaData = Reflect.getMetadata(Constants.metadata.validation, context.controllerObject,
            routeDescriptor.propertyKey) as ValidatorData[];
        const paramMetaData = Reflect.getMetadata(Constants.metadata.routeParams, context.controllerObject,
            routeDescriptor.propertyKey) as ParamData[] || [];
        const queryStringMetaData = Reflect.getMetadata(Constants.metadata.queryString, context.controllerObject,
            routeDescriptor.propertyKey) as QueryString[];
        let optionalParameters: ValidatorData[] = [];
        if (validationMetaData && validationMetaData.length) {
            optionalParameters = validationMetaData.filter(m => m.validator === "Optional");
        }

        let errorMessages: string[] = [];
        const args = new Array(methodParameters.length);
        methodParameters.forEach((par, index) => {
            let isFound = false;
            const param = paramMetaData.find(p => p.paramName === par);

            if (param) {
                isFound = true;
                if (!isValidType(methodParameterTypes[index], param.paramValue)) {
                    errorMessages.push(`Param ${param.paramName} of type ${methodParameterTypes[index].name} is not valid`);
                } else {
                    args[index] = param.paramValue;
                }
            } else {
                const queryString = queryStringMetaData ? queryStringMetaData.find(q => q.name === par) : undefined;
                if (queryString) {
                    isFound = true;
                    if (!isValidType(methodParameterTypes[index], queryString.value)) {
                        errorMessages.push(`Parameter ${queryString.name} of type ${methodParameterTypes[index].name} is not valid`);
                    } else {
                        args[index] = queryString.value;
                    }
                } else {
                    const optionalParameter = optionalParameters ? optionalParameters.find(o => o.parameterIndex === index) : undefined;
                    if (optionalParameter) {
                        isFound = true;
                    }
                }
            }
            if (!isFound) {
                if (routeDescriptor.httpMethod === HttpMethod.GET) {
                    errorMessages.push(`Parameter ${par} is missing in request`);
                } else {
                    if (methodParameterTypes[index].name === "Number" || methodParameterTypes[index].name === "String"
                        || methodParameterTypes[index].name === "Boolean") {
                        errorMessages.push(`Parameter ${par} is missing in request`);
                    } else {
                        if (methodParameterTypes[index].name !== "Object") {
                            const result = this.validateRequestBody(context, methodParameterTypes[index]);
                            errorMessages = [...errorMessages, ...result];
                        }
                        args[index] = context.request.body;
                    }
                }
            }
        });
        if (errorMessages.length === 0) {
            Reflect.defineMetadata(Constants.metadata.args, args, context.controllerObject);
        }
        return errorMessages;
    }

    private validateRequestBody(context: HttpContext, paramtype: any): string[] {
        const instance = new paramtype();
        const validatorDataArr = Reflect.getMetadata(Constants.metadata.validation, instance) as ValidatorData[];
        const errorMessages: string[] = [];

        if (validatorDataArr && validatorDataArr.length) {
            const objectKeys = Object.keys(context.request.body);

            validatorDataArr.forEach((validatorData) => {
                const keyIndex = objectKeys.findIndex(key => key === validatorData.propertyKey);
                const validationResult = validatorData.validate(keyIndex !== -1 ? context.request.body[objectKeys[keyIndex]] : undefined,
                    validatorData, instance);
                if (typeof validationResult === "string" && validationResult) {
                    errorMessages.push(validationResult);
                }
            });
        }
        return errorMessages;
    }
}