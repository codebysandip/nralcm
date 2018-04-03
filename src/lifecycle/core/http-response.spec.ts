import "mocha";
import { expect } from "chai";
import * as sinon from "sinon";
import { HttpResponse } from "./http-response";
import { HttpContext } from ".";
import { Request, Response } from "express-serve-static-core";
import { StatusCode } from "../../common/enums";

describe("HttpResponse", () => {
    let request: Partial<Request> = {};
    let response: Partial<Response> = {
        getHeader: sinon.stub()
    };
    let httpContext = new HttpContext(<Request>request, <Response>response);

    describe("send", () => {
        it("should return response object with Ok statusCode", () => {
            let data = { id: 1, name: "demo" };
            let httpResponse = new HttpResponse(httpContext);
        
            httpResponse.send(data);

            expect(httpContext.httpResponseMessage).to.not.undefined;
        });

        it("should return response object with Bad Request statusCode", () => {
            let data = { id: 1, name: "demo" };
            let httpResponse = new HttpResponse(httpContext);
            httpResponse.send(data, StatusCode.BadRequest);
            expect(httpContext.httpResponseMessage.statusCode).to.equal(StatusCode.BadRequest);
        });

        it("should return response object with Bad Request statusCode and header 'demo'", () => {
            let data = { id: 1, name: "demo" };
            let httpResponse = new HttpResponse(httpContext);
            httpResponse.send(data, StatusCode.BadRequest, new Map<string, string>().set("demo", "value"));
            expect(httpContext.httpResponseMessage.statusCode).to.equal(StatusCode.BadRequest);
            expect(httpContext.httpResponseMessage.headers.get("demo")).to.equal("value");
        });
    });
});

