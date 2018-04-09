import "mocha";
import { expect } from "chai";
import * as sinon from "sinon";
import { ApiMethodMapper } from "./api-method-mapper";
import { HttpContext, RestApiConfiguration, IHttpResponseHandler } from "..";
import { Request, Response } from "express-serve-static-core";
import { ProductController } from "../../controllers/product.controller";
import { HttpMethod } from "../../common";
import { NotFoundException } from "../../exceptions";

describe("ApiMethodMapper", () => {
    it("should return RouteDescriptor of get method", () => {
        let request: Partial<Request> = {
            url: "/api/product",
            method: HttpMethod.GET
        };
        let response: Partial<Response> = {};
        let httpContext = new HttpContext(<Request>request, <Response>response);
        httpContext.controller = ProductController;
        let controller: any = ProductController
        httpContext.controllerObject = new controller();
        let restApiConfig: Partial<RestApiConfiguration> = {};

        const routeDescriptor = ApiMethodMapper(httpContext, <RestApiConfiguration>restApiConfig);
        expect(routeDescriptor.methodName).to.equal("get");
    });

    it("should throw NotFoundException", () => {
        let request: Partial<Request> = {
            url: "/api/product/getProductDetails/10",
            method: HttpMethod.GET
        };
        let response: Partial<Response> = {
            type: sinon.stub(),
            status: sinon.stub(),
            send: sinon.stub()
        };
        (response.type as sinon.SinonStub).callsFake(() => {
            return response;
        });
        (response.status as sinon.SinonStub).callsFake((status) => {
            response.statusCode = status;
            return response;
        });
        (response.send as sinon.SinonStub).callsFake(() => {
            return response;
        });
        let httpContext = new HttpContext(<Request>request, <Response>response);
        httpContext.controller = ProductController;
        let controller: any = ProductController
        httpContext.controllerObject = new controller();
        let httpResponseHandler: Partial<IHttpResponseHandler> = {
            sendResponse: sinon.stub()
        };
        let restApiConfig: Partial<RestApiConfiguration> = {
            HttpResponseHandler: <IHttpResponseHandler>httpResponseHandler
        };

        try {
            ApiMethodMapper(httpContext, <RestApiConfiguration>restApiConfig);
        } catch (e) {
            expect(e).to.instanceof(NotFoundException);
            return;
        }
        throw new Error("Not passed test");
    })

});