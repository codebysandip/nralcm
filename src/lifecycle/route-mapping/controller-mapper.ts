import { HttpContext, RestApiConfiguration } from "..";
import { IRoute } from "../../common";
import { NotFoundException } from "../../exceptions";

/**
 * Maps Route with controller,
 * If not found throws not Found exception
 * @param context HttpContext Object
 * @returns route
 */
export function ControllerMapper(context: HttpContext): IRoute {
    const urlParts = getUrlParts(context.request.url);
    const route = RestApiConfiguration.routes.find(route => urlParts[0] == route.path);

    if (route && urlParts.length >= 1) {
        return route;
    }
    throw new NotFoundException(context);
}

/**
 * Function to get url parts after api excluding query string
 * @param url request url
 */
function getUrlParts(url: string): string[] {
    url = url.substring(url.indexOf("api") + 3);
    url = url.startsWith("/") ? url.substring(1) : url;
    const queryStringIndex = url.indexOf("?");
    if (queryStringIndex !== -1) {
        url = url.split("?")[0];
    }
    return url ? url.split("/") : [];
}