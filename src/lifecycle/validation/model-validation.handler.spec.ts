import "mocha";
import { expect } from "chai";
// import * as sinon from "sinon";
import { Request, Response } from "express-serve-static-core";
import { ProductController } from "../../controllers/product.controller";
import { HttpContext, ModelValidationHandler, Constants } from "..";
import { RouteDescriptor, HttpMethod, ParamData } from "../../common";

describe("ModelValidationHandler", () => {
    it("validate, Didn't set param so it will return 3 errors for params", () => {
        let request: Partial<Request> = {};
        let response: Partial<Response> = {};
        let httpContext = new HttpContext(<Request>request, <Response>response);
        httpContext.controller = ProductController;
        let type: any = ProductController;
        httpContext.controllerObject = new type();

        let routeDescriptor: Partial<RouteDescriptor> = {
            methodName: "getProduct",
            httpMethod: HttpMethod.GET
        };

        let modelValidationHandler = new ModelValidationHandler();
        let errors = modelValidationHandler.validate(httpContext, <RouteDescriptor>routeDescriptor);
        expect(errors.length).to.equal(3);
    });

    it("validate, setting param so it will not return any error for params", () => {
        let request: Partial<Request> = {};
        let response: Partial<Response> = {};
        let httpContext = new HttpContext(<Request>request, <Response>response);
        httpContext.controller = ProductController;
        let type: any = ProductController;
        httpContext.controllerObject = new type();

        let routeDescriptor: Partial<RouteDescriptor> = {
            methodName: "getProduct",
            httpMethod: HttpMethod.GET
        };

        let paramData: ParamData[] = [
            { paramName: "id", paramValue: 1 },
            { paramName: "sd", paramValue: 3 },
            { paramName: "abc", paramValue: "scs"}
        ]
        Reflect.defineMetadata(Constants.metadata.routeParams, paramData, httpContext.controllerObject, "getProduct");
        let modelValidationHandler = new ModelValidationHandler();
        let errors = modelValidationHandler.validate(httpContext, <RouteDescriptor>routeDescriptor);
        expect(errors.length).to.equal(0);
    });

});