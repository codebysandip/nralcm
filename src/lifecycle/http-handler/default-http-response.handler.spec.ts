import "mocha";
import { expect } from "chai";
import * as sinon from "sinon";
import { Request, Response } from "express-serve-static-core";
import { HttpContext, HttpResponseMessage } from "..";
import { DefaultHttpResponseHandler } from ".";
import { StatusCode } from "../../common/enums";

describe("DefaultHttpResponseHandler", () => {
    let request: Partial<Request> = {};
    let response: Partial<Response> = {
        type: sinon.stub(),
        status: sinon.stub(),
        send: sinon.stub()
    };
    let httpContext = new HttpContext(<Request>request, <Response>response);

    describe("sendResponse", () => {
        let httpResponseMessage: Partial<HttpResponseMessage<any>> = {
            statusCode: StatusCode.Ok,
            headers: new Map<string, string>()
        }
        it("should return OK status code", () => {
            let responseHandler = new DefaultHttpResponseHandler();
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

            let res = responseHandler.sendResponse(httpContext, <HttpResponseMessage<any>>httpResponseMessage);
            expect(res.statusCode).to.equal(StatusCode.Ok);
        });
    });
})