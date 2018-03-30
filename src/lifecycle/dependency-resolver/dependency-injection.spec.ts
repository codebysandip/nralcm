import "mocha";
import { expect } from "chai";
// import * as sinon from "sinon";
import { DependencyInjection } from ".";
import { HttpContext, BaseController, HttpResponse } from "..";
import { Request, Response } from "express-serve-static-core";
import { Controller, Repository } from "../../decorators";

describe("DependencyInjection", () => {
    let request: Partial<Request> = {};
    let response: Partial<Response> = {};
    let httpContext = new HttpContext(<Request>request, <Response>response);

    describe("inject", () => {
        it("should inject dependency of DemoRepository in DemoController", () => {
            httpContext.controller = DemoController;
            // let httpResponseHandler: Partial<IHttpResponseHandler> = {
            //     sendResponse: sinon.stub()
            // };
            let httpResponse: Partial<HttpResponse> = {};
            let di = new DependencyInjection(httpContext, <HttpResponse>httpResponse);
            di.inject();
            let result = httpContext.controllerObject.get();
            expect(result.id).to.equal(1);

        })
    });
});

@Repository()
export class DemoRepository {
    constructor() {}

    public getData() {
        return { id: 1, name: "demo" };
    }
}

@Controller()
export class DemoController extends BaseController {
    constructor(private _repo: DemoRepository) {
        super();
    }

    public get() {
        return this._repo.getData();
    }
}

