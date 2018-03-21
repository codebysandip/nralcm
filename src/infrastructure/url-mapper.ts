import { RouteDescriptor } from "../infrastructure/route-descriptor";
import "reflect-metadata";
import { ValidatorData } from "../validators/validator-data";
import { Constants } from "../infrastructure/rest-api-constants";
import { QueryString } from "../infrastructure/query-string";
import { constants } from "os";
import { HttpContext } from "./http-context";
import { NotFoundException } from "../exceptions/not-found.exception";
import { getMethodParameters } from "../common/get-method-parameters";
import { isValidType } from "../common/check-valid-type";
import { HttpMethod } from "./http-method.enum";
import { ParamData } from "../common/model/param-data";

export function UrlMapper(routeDescriptors: RouteDescriptor[], url: string, context: HttpContext): RouteDescriptor | null {
    // try to find route without param
    const routeDescriptor = routeDescriptors.find(routeDescriptor => routeDescriptor.route === url);
    if (routeDescriptor) {
        mapQueryString(context, routeDescriptor);
        validateParamsAndQueryWithMethodParameters(context, routeDescriptor);
        return routeDescriptor;
    }

    const paramMapResult = mapParams(context, routeDescriptors, url);
    if (paramMapResult !== null) {
        mapQueryString(context, paramMapResult);
        validateParamsAndQueryWithMethodParameters(context, paramMapResult);
        return paramMapResult;
    }
    new NotFoundException(context);
    // tslint:disable-next-line:no-null-keyword
    return null;
}

function mapApiMethod(context: HttpContext) {

}

function mapParams(context: HttpContext, routeDescriptors: RouteDescriptor[], url: string): RouteDescriptor|null {
    for (let index = 0; index < routeDescriptors.length; index++) {
        const routeParts = routeDescriptors[index].route.startsWith("/") ? routeDescriptors[index].route.substring(1).split("/") : routeDescriptors[index].route.split("/");
        const urlParts = url.startsWith("/") ? url.substring(1).split("/") : url.split("/");
        if (routeParts.length === urlParts.length && routeDescriptors[index].route.indexOf("{") >= 0 && routeDescriptors[index].route.indexOf("}") >= 0) {
            const nonParamsRouteParts = routeParts.filter(route => route.indexOf("{") === -1 || route.indexOf("}") === -1);
            let isMatched = false;
            nonParamsRouteParts.forEach((routePart, index) => {
                if (urlParts.find(urlPart => urlPart === routePart)) {
                    isMatched = true;
                } else {
                    isMatched = false;
                }
            });
            if (isMatched) {
                routeParts.forEach((route, i) => {
                    const openCurlyBraceIndex = route.indexOf("{");
                    const closeCurlyBraceIndex = route.indexOf("}");
                    if (openCurlyBraceIndex >= 0 && closeCurlyBraceIndex >= 0) {
                        if (urlParts[i]) {
                            const paramData: ParamData = {
                                paramName: route.substring(openCurlyBraceIndex + 1, closeCurlyBraceIndex),
                                paramValue: urlParts[i]
                            };
                            const paramMetaDataArr: ParamData[] = Reflect.getMetadata(Constants.metadata.routeParams,
                                    context.controllerObject, routeDescriptors[index].propertyKey) || [];
                            paramMetaDataArr.push(paramData);
                            Reflect.defineMetadata(Constants.metadata.routeParams, paramMetaDataArr,
                                context.controllerObject, routeDescriptors[index].propertyKey);
                        } else {
                            const existingErrorMessages = Reflect.getMetadata(Constants.metadata.emptyRouteParams, context.controllerObject) as string[] || [];
                            existingErrorMessages.push(`Parametr ${route.substring(openCurlyBraceIndex + 1, closeCurlyBraceIndex)} is missing`);
                            Reflect.defineMetadata(Constants.metadata.emptyRouteParams, existingErrorMessages, context.controllerObject);
                        }
                    }
                });
                return routeDescriptors[index];
            }
        }
    }
    // tslint:disable-next-line:no-null-keyword
    return null;
}

function mapQueryString(context: HttpContext, routeDescriptor: RouteDescriptor) {
    if (context.request.query) {
            const existingQueryStrings = Reflect.getMetadata(Constants.metadata.queryString, context.controllerObject,
                                            routeDescriptor.propertyKey) as QueryString[] || [];
            Object.keys(context.request.query).forEach(qs => {
                existingQueryStrings.push({
                    name: qs,
                    value: context.request.query[qs]
                });
            });

            Reflect.defineMetadata(Constants.metadata.queryString, existingQueryStrings, context.controllerObject,
                routeDescriptor.propertyKey);
    }
}

function validateParamsAndQueryWithMethodParameters(context: HttpContext, routeDescriptor: RouteDescriptor) {
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

    let existingErrorMessages = Reflect.getMetadata(Constants.metadata.errorMessages, context.controllerObject) as string[] || [];
    const args = new Array(methodParameters.length);
    methodParameters.forEach((par, index) => {
        let isFound = false;
        const param = paramMetaData.find(p => p.paramName === par);

        if (param) {
            isFound = true;
            if (!isValidType(methodParameterTypes[index], param.paramValue)) {
                existingErrorMessages.push(`Param ${param.paramName} of type ${methodParameterTypes[index].name} is not valid`);
            } else {
                args[index] = param.paramValue;
            }
        } else {
            const queryString = queryStringMetaData ? queryStringMetaData.find(q => q.name === par) : undefined;
            if (queryString) {
                isFound = true;
                if (!isValidType(methodParameterTypes[index], queryString.value)) {
                    existingErrorMessages.push(`Parameter ${queryString.name} of type ${methodParameterTypes[index].name} is not valid`);
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
                existingErrorMessages.push(`Parameter ${par} is missing in request`);
            } else {
                if (methodParameterTypes[index].name === "Number" || methodParameterTypes[index].name === "String"
                        || methodParameterTypes[index].name === "Boolean") {
                    existingErrorMessages.push(`Parameter ${par} is missing in request`);
                } else {
                    if (methodParameterTypes[index].name !== "Object") {
                        const result = validateRequestBody(context, methodParameterTypes[index], par);
                        existingErrorMessages = [...existingErrorMessages, ...result];
                    }
                    args[index] = context.request.body;
                }
            }
        }
    });
    if (existingErrorMessages.length === 0) {
        Reflect.defineMetadata(Constants.metadata.args, args, context.controllerObject);
    }
    Reflect.defineMetadata(Constants.metadata.errorMessages, existingErrorMessages, context.controllerObject);
}

function validateRequestBody(context: HttpContext, paramtype: any, param: string): string[] {
    const instance = new paramtype();
    const validatorDataArr = Reflect.getMetadata(Constants.metadata.validation, instance) as ValidatorData[];
    const errorMessages: string[] = [];

    if (validatorDataArr && validatorDataArr.length) {
        const objectKeys = Object.keys(context.request.body);

        validatorDataArr.forEach((validatorData, index) => {
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