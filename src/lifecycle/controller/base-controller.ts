import { HttpResponse } from "..";

/**
 * BaseController is a abstract class for extend of controller.
 * It provides Request and customised Response object
 */
export abstract class BaseController {
    /**
     * NodeJS Request Object
     */
    public request: Request;
    /**
     * Customized Response Object
     */
    public response: HttpResponse;
}