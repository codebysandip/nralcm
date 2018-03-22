import { RouteDescriptor } from "../infrastructure/route-descriptor";
import "reflect-metadata";
import { Constants } from "../infrastructure/rest-api-constants";
import { QueryString } from "../infrastructure/query-string";
import { HttpContext } from "./http-context";
import { NotFoundException } from "../exceptions/not-found.exception";
import { ParamData } from "../common/model/param-data";

/**
 * Maps current request with api method of controller
 * @param context HttpContext object
 * @returns RouteDescriptor object, If not found throws NotFoundException
 */
export function ApiMethodMapper(context: HttpContext): RouteDescriptor {
    const urlParts = getUrlParts(context.request.url);
    const url = urlParts.slice(1).join("/");

    // try to find route without param
    const routeDescriptors: RouteDescriptor[] = Reflect.getMetadata("routes", context.controllerObject as Object);
    const routeDescriptor = routeDescriptors.find(routeDescriptor => routeDescriptor.route === url);
    if (routeDescriptor) {
        mapQueryString(context, routeDescriptor);
        return routeDescriptor;
    }
    // find route with param
    const paramMapResult = mapParams(context, routeDescriptors, url);
    if (paramMapResult !== null) {
        mapQueryString(context, paramMapResult);
        return paramMapResult;
    }
    throw new NotFoundException(context);
}

/**
 * get url parts after api
 * @param url request url
 * @returns Array of url parts
 */
function getUrlParts(url: string): string[] {
    url = url.substring(url.indexOf("api") + 3);
    url = url.startsWith("/") ? url.substring(1) : url;
    const queryStringIndex = url.indexOf("?");
    if (queryStringIndex > 0) {
        url = url.substring(0, url.indexOf("?"));
    }
    return url ? url.split("/") : [];
}

/**
 * Maps params of url with route and saves in meta data of controller object
 * @param context HttpContext Object
 * @param routeDescriptors All RouteDescriptor data of controller
 * @param url compact url like compact url of 'api/product/getproduct' will be getproduct
 */
function mapParams(context: HttpContext, routeDescriptors: RouteDescriptor[], url: string): RouteDescriptor {
    for (let index = 0; index < routeDescriptors.length; index++) {
        const routeParts = routeDescriptors[index].route.startsWith("/") ? routeDescriptors[index].route.substring(1).split("/") : routeDescriptors[index].route.split("/");
        const urlParts = url.startsWith("/") ? url.substring(1).split("/") : url.split("/");
        if (routeParts.length === urlParts.length && routeDescriptors[index].route.indexOf("{") >= 0 && routeDescriptors[index].route.indexOf("}") >= 0) {
            const nonParamsRouteParts = routeParts.filter(route => route.indexOf("{") === -1 || route.indexOf("}") === -1);
            let isMatched = false;
            nonParamsRouteParts.forEach((routePart) => {
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
    throw new NotFoundException(context);
}

/**
 * Gets query string from request and saves query string in metatdata of controller object
 * @param context HttpContext Object
 * @param routeDescriptor RouteDescriptor object that holds metadata of api method
 */
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

