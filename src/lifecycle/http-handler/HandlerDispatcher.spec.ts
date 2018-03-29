import "mocha";
import { expect } from "chai";
import * as sinon from "sinon";
import { HttpConfiguration, IHttpHandler, HandlerDispatcher, HttpContext } from "..";
import { Request, Response } from "express-serve-static-core";
import { HandlerNotFoundException } from "../../exceptions";
import { HttpMethod } from "../../common";

describe("HandlerDispatcher", () => {
    describe("processHandler", () => {
        it("should process registered handler and should set status code", () => {
            let request: Partial<Request> = {
                url: "/api/product",
                method: HttpMethod.GET
            };
            let response: Partial<Response> = {
            };
        
            let handler: Partial<IHttpHandler> = {
                processRequest: sinon.stub()
            };

            (handler.processRequest as sinon.SinonStub).callsFake((req: Request) => {
                req.statusCode = 201
            });
            HttpConfiguration.addHandler("/api/*", <IHttpHandler>handler);

            HandlerDispatcher.processHandler(<Request>request, <Response>response);

            expect(request.statusCode).to.equal(201);
        });

        it("should process registered handler and throw HandlerNotFoundException", () => {
            let request: Partial<Request> = {
                url: "/product",
                method: HttpMethod.GET
            };
            let response: Partial<Response> = {
                type: sinon.stub(),
                status: sinon.stub(),
                json: sinon.stub()
            };
        
            (response.type as sinon.SinonStub).callsFake(() => {
                return response;
            });
            (response.status as sinon.SinonStub).callsFake((status) => {
                response.statusCode = status;
                return response;
            });
            (response.json as sinon.SinonStub).callsFake(() => {
                return response;
            });

            let handler: Partial<IHttpHandler> = {
                processRequest: sinon.stub()
            };

            (handler.processRequest as sinon.SinonStub).callsFake((req: Request) => {
                req.statusCode = 201;
            });
            HttpConfiguration.addHandler("/api/*", <IHttpHandler>handler);
            let httpContext = new HttpContext(<Request>request, <Response>response);

            try {
                HandlerDispatcher.processHandler(<Request>request, <Response>response, httpContext);
                expect(request.statusCode).to.equal(201);
            } catch (e) {
                console.log(e);
                expect(e).to.instanceof(HandlerNotFoundException);
            }

        });

    });
});