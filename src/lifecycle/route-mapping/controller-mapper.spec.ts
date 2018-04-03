import "mocha";
import { expect } from "chai";
import * as sinon from "sinon";
import { HttpContext, ControllerMapper, RestApiConfiguration } from "..";
import { Request, Response } from "express-serve-static-core";
import { IRoute } from "../../common";
import { ProductController } from "../../controllers/product.controller";
import { NotFoundException } from "../../exceptions";

describe("ControllerMapper", () => {
    it("should map with specified route and must return route", () => {
        let request: Partial<Request> = {
            url: "api/product"
        };
        let response: Partial<Response> = {};
        let httpContext = new HttpContext(<Request>request, <Response>response);
        let routes: IRoute[] = [
            { path: "product", controller: ProductController }
        ];
        let restApiConfiguration: Partial<RestApiConfiguration> = {
            routes: routes
        };

        let route: IRoute = ControllerMapper(httpContext, <RestApiConfiguration>restApiConfiguration);
        expect(route.path).to.equal("product");
    });

    it("should throw NotFoundException", () => {
        let request: Partial<Request> = {
            url: "api/product1"
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
        let routes: IRoute[] = [
            { path: "product", controller: ProductController }
        ]
        let restApiConfiguration: Partial<RestApiConfiguration> = {
            routes: routes
        };

        try {
            let route: IRoute = ControllerMapper(httpContext, <RestApiConfiguration>restApiConfiguration);
            expect(route.path).to.equal("product");
        } catch (e) {
            expect(e).to.instanceof(NotFoundException);
        }
    });

});