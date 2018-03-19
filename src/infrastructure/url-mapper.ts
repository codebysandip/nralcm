import { RouteDescriptor } from "../infrastructure/route-descriptor";
import "reflect-metadata";
import { ValidatorData } from "../validators/validator-data";
import { Constants } from "../infrastructure/rest-api-constants";
import { QueryString } from "../infrastructure/query-string";
import { constants } from "os";
import { HttpContext } from "./http-request";
import { NotFoundException } from "../exceptions/not-found.exception";

export function UrlMapper(routeDescriptors: RouteDescriptor[], url: string, context: HttpContext): RouteDescriptor | false {
    // try to find route without param
    const routeDescriptor = routeDescriptors.find(routeDescriptor => routeDescriptor.route === url);
    if (routeDescriptor) {
        mapQueryString(context);
        return routeDescriptor;
    }

    const paramMapResult = mapParams(context, routeDescriptors, url);
    if (typeof paramMapResult !== "boolean") {
        mapQueryString(context);
        return paramMapResult;
    } else if (paramMapResult) {
        return false;
    }
    new NotFoundException(context);
    return false;
}

function mapApiMethod(context: HttpContext) {

}

function mapParams(context: HttpContext, routeDescriptors: RouteDescriptor[], url: string): RouteDescriptor|false {
    let isFound = false;
    for (let index = 0; index < routeDescriptors.length; index++) {
        const routeParts = routeDescriptors[index].route.startsWith("/") ? routeDescriptors[index].route.substring(1).split("/") : routeDescriptors[index].route.split("/");
        const urlParts = url.startsWith("/") ? url.substring(1).split("/") : url.split("/");
        if (routeParts.length === urlParts.length && routeDescriptors[index].route.indexOf("{") >= 0) {
            const nonParamsRouteParts = routeParts.filter(route => route.indexOf("{") === -1 || route.indexOf("}") === -1);
            const nonParamsUrlParts = routeParts.filter(route => route.indexOf("{") === -1 || route.indexOf("}") === -1);
            if (nonParamsRouteParts.length === nonParamsUrlParts.length) {
                let isMatched = false;
                nonParamsRouteParts.forEach((routePart, index) => {
                    if (nonParamsUrlParts.find(urlPart => urlPart === routePart)) {
                        isMatched = true;
                    } else {
                        isMatched = false;
                    }
                });
                if (isMatched) {
                    let isEmptyParams = false;
                    isFound = true;
                    routeParts.forEach((route, i) => {
                        const openCurlyBraceIndex = route.indexOf("{");
                        const closeCurlyBraceIndex = route.indexOf("}");
                        if (openCurlyBraceIndex >= 0 && closeCurlyBraceIndex >= 0) {
                            if (urlParts[i]) {
                                const validatorData: ValidatorData = {
                                    propertyKey: routeDescriptors[index].propertyKey,
                                    parameterIndex: i,
                                    validator: "param",
                                    paramName: route.substring(openCurlyBraceIndex + 1, closeCurlyBraceIndex),
                                    validate: function() {},
                                    paramValue: urlParts[i]
                                };
                                const validatorDataArr: ValidatorData[] = Reflect.getMetadata(Constants.metadata.routeParams, context.controllerObject) || [];
                                validatorDataArr.push(validatorData);
                                Reflect.defineMetadata(Constants.metadata.routeParams, validatorDataArr, context.controllerObject);
                            } else {
                                // return response
                                isEmptyParams = true;
                                if (context.controller) {
                                    const emptyRouteParams = Reflect.getMetadata(Constants.metadata.emptyRouteParams, context.controllerObject) as string[] || [];
                                    emptyRouteParams.push(route.substring(openCurlyBraceIndex + 1, closeCurlyBraceIndex));
                                    Reflect.defineMetadata(Constants.metadata.emptyRouteParams, emptyRouteParams, context.controllerObject);
                                }
                            }
                        }
                    });
                    if (!isEmptyParams) {
                        return routeDescriptors[index];
                    } else {
                        isFound = false;
                        const emptyRouteParams = Reflect.getMetadata(Constants.metadata.emptyRouteParams, context.controllerObject) as string[] || [];
                        let message: string = "";
                        emptyRouteParams.forEach(val => {
                            message += `Parametr ${val} is missing`;
                        });
                        context.response.type("application/json").status(400).send({ message: message });
                        return false;
                    }
                }
            }
        }
    }
    return isFound;
}

function mapQueryString(context: HttpContext) {
    const queryStringIndex = context.request.url.indexOf("?");
    if (queryStringIndex > 0) {
        const splittedUrl = context.request.url.split("?");
        if (splittedUrl.length == 2) {
            const queryString = splittedUrl[1];
            const queryStringArr: string[] = queryString.split("&");
            queryStringArr.forEach(qs => {
                const existingQueryStrings = Reflect.getMetadata(Constants.metadata.queryString, context.controllerObject) as QueryString[] || [];
                existingQueryStrings.push({
                    name: qs.split("=")[0],
                    value: qs.split("=")[1]
                });
                Reflect.defineMetadata(Constants.metadata.queryString, existingQueryStrings, context.controllerObject);
            });
        }
    }
}

function mapBodyWithParameter(context: HttpContext) {

}