import { HttpContext } from "./http-context";
import { routes } from "../app.routes";
import { NotFoundException } from "../exceptions/not-found.exception";
import { IRoute } from "./route";

/**
 * Maps Route with controller,
 * If not found throws not Found exception
 * @param context HttpContext Object
 * @returns route
 */
export function ControllerMapper(context: HttpContext): IRoute {
    const urlParts = getUrlParts(context.request.url);
    const route = routes.find(route => urlParts[0] == route.path);

    if (route && urlParts.length > 1) {
        return route;
    }
    throw new NotFoundException(context);
}

function getUrlParts(url: string) {
    url = url.substring(url.indexOf("api") + 3);
    url = url.startsWith("/") ? url.substring(1) : url;
    return url ? url.split("/") : [];
}