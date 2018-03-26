
/**
 * Route data to pass routes in RestApiConfiguration
 */
export interface IRoute {
    /**
     * path of controller
     * usage: For ProductController path "product"
     */
    path: string;
    controller: any;
}