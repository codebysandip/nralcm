import "mocha";
import { expect } from "chai";
import * as sinon from "sinon";
import { HttpResponse } from "./http-response";
import { HttpContext } from ".";
import { Request, Response } from "express-serve-static-core";
import { IHttpResponseHandler, HttpResponseMessage } from "..";
import { StatusCode } from "../../common/enums";

describe("HttpResponse", () => {
    let request: Partial<Request> = {};
    let response: Partial<Response> = {};
    let httpContext = new HttpContext(<Request>request, <Response>response);

    describe("send", () => {
        it("should return response object with Ok statusCode", () => {
            let data = { id: 1, name: "demo" };
            let httpResponseHandler: Partial<IHttpResponseHandler> = {
                sendResponse: sinon.stub()
            };
            let httpResponse = new HttpResponse(httpContext, <IHttpResponseHandler>httpResponseHandler);
        
            (httpResponseHandler.sendResponse as sinon.SinonStub).callsFake(mockResonse);
            let serverResponse = httpResponse.send(data);

            expect(serverResponse.statusCode).to.equal(StatusCode.Ok);
        });

        it("should return response object with Bad Request statusCode", () => {
            let data = { id: 1, name: "demo" };
            let httpResponseHandler: Partial<IHttpResponseHandler> = {
                sendResponse: sinon.stub()
            };
            let httpResponse = new HttpResponse(httpContext, <IHttpResponseHandler>httpResponseHandler);
            (httpResponseHandler.sendResponse as sinon.SinonStub).callsFake(mockResonse);
            let serverResponse = httpResponse.send(data, StatusCode.BadRequest);
            expect(serverResponse.statusCode).to.equal(StatusCode.BadRequest);
        });

        it("should return response object with Bad Request statusCode and header 'demo'", () => {
            let data = { id: 1, name: "demo" };
            let httpResponseHandler: Partial<IHttpResponseHandler> = {
                sendResponse: sinon.stub()
            };
            let httpResponse = new HttpResponse(httpContext, <IHttpResponseHandler>httpResponseHandler);
            (httpResponseHandler.sendResponse as sinon.SinonStub).callsFake(mockResonse);
            let serverResponse = httpResponse.send(data, StatusCode.BadRequest, new Map<string, string>().set("demo", "value"));
            expect(serverResponse.statusCode).to.equal(StatusCode.BadRequest);
            expect(serverResponse.header["demo"]).to.equal("value");
        });
    });
});

const mockResonse = (httpContext: HttpContext, httpResponseMessage: HttpResponseMessage<Object>) => {
    let headerObj = {};
    if (httpResponseMessage.headers.size > 0) {
        for (let [key, value] of httpResponseMessage.headers) {
            headerObj[key] = value;
        }
    }
    let obj =  {
        statusCode: httpResponseMessage.statusCode,
        header: headerObj
    };
    return obj;
};