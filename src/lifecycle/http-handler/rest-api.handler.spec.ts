import "mocha";
// import { expect } from "chai";
import * as sinon from "sinon";
// import { HttpConfiguration, IHttpHandler, HandlerDispatcher, RestApiHandler } from "..";
import { Request, Response } from "express-serve-static-core";
import { RestApiHandler } from ".";
import { AppConfig } from "../../app-config";
import { RestApiConfiguration } from "..";
import { HttpMethod } from "../../common";

describe("RestApiHandler", () => {
    let response: Partial<Response> = {
        type: sinon.stub(),
        status: sinon.stub(),
        json: sinon.stub(),
        send: sinon.stub()
    };

    it("should throw 401", () => {
        let request: Partial<Request> = {
            url: "/api/product/10/getProduct/15",
            method: HttpMethod.GET,
            header: sinon.stub()
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

        (request.header as sinon.SinonStub).callsFake(() => {
            return null;
        });

        let restApiConfiguration = new RestApiConfiguration();
        new AppConfig(restApiConfiguration).register();
        let apiHandler = new RestApiHandler(restApiConfiguration);
        apiHandler.processRequest(<Request>request, <Response>response);
    });
});