import "mocha";
import { expect } from "chai";
import * as sinon from "sinon";
import { FilterExecuter, IFilter } from ".";
import { Request, Response } from "express-serve-static-core";
import { HttpContext, DependencyInjection, HttpResponse } from "..";
import { RouteDescriptor, HttpMethod } from "../../common";
import { ProductController } from "../../controllers/product.controller";
import { getHttpResponse } from "../../common/functions";

describe("FilterExecuter", () => {
    let request: Partial<Request> = {};
    let response: Partial<Response> = {};
    let httpContext = new HttpContext(<Request>request, <Response>response);
    let testFilter: Partial<IFilter> = {
        beforeActionExceduted: sinon.stub(),
        aftereActionExceduted: sinon.stub()
    };
    let globalFilters: IFilter[] = [<IFilter>testFilter];

    describe("executeBeforeActionExceduted", () => {
        let routeDescriptor: Partial<RouteDescriptor> = {
            route: "test",
            httpMethod: HttpMethod.GET,
            methodName: "testFilter"
        };
    
        it("should execute IFilter.beforeActionExceduted with global filter", () => {
            httpContext.controllerObject = {};
            let fe = new FilterExecuter(httpContext, <RouteDescriptor>routeDescriptor, globalFilters);
            (testFilter.beforeActionExceduted as sinon.SinonStub).callsFake((context, descriptor: RouteDescriptor) => {
                console.log(context);
                expect(descriptor.httpMethod).to.equal(HttpMethod.GET);
            });
            fe.executeBeforeActionExceduted();
        });

        // it("should execute IFilter.beforeActionExceduted with decorator filter", () => {
        //     httpContext.controller = ProductController;

        //     let httpResponse: Partial<HttpResponse> = {};
        //     let di = new DependencyInjection(httpContext, <HttpResponse>httpResponse);
        //     di.inject();

        //     let fe = new FilterExecuter(httpContext, <RouteDescriptor>routeDescriptor, globalFilters);
        //     fe.executeBeforeActionExceduted();
        //     expect(routeDescriptor.route).to.equal("TestFilter-beforeActionExceduted ProductController");
        // });

    });

    describe("executeAfterActionExceduted", () => {
        it("should execute IFilter.executeAfterActionExceduted with global filter", () => {
            httpContext.controllerObject = {};
            let fe = new FilterExecuter(httpContext, <RouteDescriptor>routeDescriptor, globalFilters);
            (testFilter.aftereActionExceduted as sinon.SinonStub).callsFake((context, descriptor: RouteDescriptor) => {
                console.log(context);
                expect(descriptor.httpMethod).to.equal(HttpMethod.GET);
            });
            fe.executeBeforeActionExceduted();
        });

        let routeDescriptor: Partial<RouteDescriptor> = {
            route: "test",
            httpMethod: HttpMethod.GET,
            methodName: "testFilter"
        };
    
        // it("should execute IFilter.aftereActionExceduted with decorator filter", () => {
        //     httpContext.controller = ProductController;
        //     let httpResponse = getHttpResponse(httpContext, this.restApiConfiguration.HttpResponseHandler)

        //     let di = new DependencyInjection(httpContext, httpResponse);
        //     di.inject();

        //     let fe = new FilterExecuter(httpContext, <RouteDescriptor>routeDescriptor, globalFilters);
        //     fe.executeBeforeActionExceduted();
        //     fe.executeAfterActionExceduted();
        //     expect(routeDescriptor.route).to.equal("TestFilter-aftereActionExceduted ProductController");
        // });
    })
});
