import "mocha";
import { expect } from "chai";
import * as sinon from "sinon";
import { HttpContext, RestApiConfiguration, AuthHandler } from "..";
import { Request, Response } from "express-serve-static-core";
import { ProductController } from "../../controllers/product.controller";
import { AuthenticationFilter } from "../../filters/authentication.filter";
import { UnAuthenticateException } from "../../exceptions";

describe("AuthHandler", () => {
    it("handle, must return true when no AuthenticationFilter registered.", () => {
        let request: Partial<Request> = {};
        let response: Partial<Response> = {};
        let httpContext = new HttpContext(<Request>request, <Response>response);
        httpContext.controller = ProductController;
        let restApiConfiguration: Partial<RestApiConfiguration> = {
        };

        let authHandler = new AuthHandler(<RestApiConfiguration>restApiConfiguration);
        let result = authHandler.handle(httpContext);
        expect(result).to.equal(true);
    });

    it("handle, must throw UnAuthenticateException when no Authorization header send in request", () => {
        let request: Partial<Request> = {
            header: sinon.stub()
        };
        let response: Partial<Response> = {
            type: sinon.stub(),
            status: sinon.stub(),
            send: sinon.stub()
        };

        (request.header as sinon.SinonStub).callsFake(() => {
            return undefined;
        });

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
        let restApiConfiguration: Partial<RestApiConfiguration> = {
            AuthenticationFilter: new AuthenticationFilter()
        };

        let authHandler = new AuthHandler(<RestApiConfiguration>restApiConfiguration);
        try {
            authHandler.handle(httpContext);
            throw new Error("Result not as expected");
        } catch(e) {
            expect(e).to.instanceof(UnAuthenticateException);
        }
    });

    it("handle, must throw true when Authorization header send in request", () => {
        let request: Partial<Request> = {
            header: sinon.stub()
        };
        let response: Partial<Response> = {
            type: sinon.stub(),
            status: sinon.stub(),
            send: sinon.stub()
        };

        (request.header as sinon.SinonStub).callsFake(() => {
            return "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJPbmxpbmUgSldUIEJ1aWxkZXIiLCJpYXQiOjE1MjE3Mjg0NDgsImV4cCI6MTU1MzI2NDQ0OCwiYXVkIjoid3d3LmV4YW1wbGUuY29tIiwic3ViIjoianJvY2tldEBleGFtcGxlLmNvbSIsIkdpdmVuTmFtZSI6IkpvaG5ueSIsIlN1cm5hbWUiOiJSb2NrZXQiLCJFbWFpbCI6Impyb2NrZXRAZXhhbXBsZS5jb20iLCJSb2xlIjpbIk1hbmFnZXIiLCJQcm9qZWN0IEFkbWluaXN0cmF0b3IiXX0.-nv6BWfQrXD3UI7l6OM0AYnCNIVfxG816UAkg0jqXas";
        });

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
        let restApiConfiguration: Partial<RestApiConfiguration> = {
            AuthenticationFilter: new AuthenticationFilter()
        };

        let authHandler = new AuthHandler(<RestApiConfiguration>restApiConfiguration);
        let result = authHandler.handle(httpContext);
        expect(result).to.equal(true);
    });

});