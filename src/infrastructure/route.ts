import { HttpMethod } from "./http-method.enum";

export interface IRoute {
    path: string;
    controller: any;
}