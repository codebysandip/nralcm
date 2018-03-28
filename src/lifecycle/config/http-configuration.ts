import { IHttpHandler } from "../http-handler";

/**
 * HttpConfiguration class provides static methods to configure application
 */
export class HttpConfiguration {
    private static handlers: [string, IHttpHandler][] = [];

    /**
     * Method to add handler
     * @param url string or regex
     * @param handler IHttpHandler
     */
    public static addHandler(url: string, handler: IHttpHandler): void {
        this.handlers.push([url, handler]);
    }

    /**
     * Method to get handler
     * @param url string or regex
     */
    public static getHandler(url: string): [string, IHttpHandler]|undefined {
        return this.handlers.find(handler => url.match(handler[0]) ? true : false);
    }

    /**
     * Removes registered handler
     * @param insatanceOfHandler class instance that implemented IHttpHandler
     * @returns boolean
     */
    public static removeHandler(insatanceOfHandler: IHttpHandler): boolean {
        let handlerIndex = this.handlers.findIndex(handler => insatanceOfHandler.constructor.name === handler[1].constructor.name);
        if (handlerIndex !== -1) {
            this.handlers.splice(handlerIndex, 1);
            return true;
        }
        return false;
    }
}