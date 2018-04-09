import "mocha";
import { expect } from "chai";
import { HttpConfiguration } from "./http-configuration";
import { IHttpHandler, RestApiConfiguration, RestApiHandler } from "..";

describe("HttpConfiguration", () => {
    describe("getHandler", () => {
        it("getHandler must return default RestApiHandler  when not any handler added", () => {
            let restApiConfig: Partial<RestApiConfiguration> = {};
            let httpConfiguration = new HttpConfiguration(<RestApiConfiguration>restApiConfig);
            const restApiHandler = httpConfiguration.getHandler("/api/product");
            expect(restApiHandler && restApiHandler[1]).to.instanceof(RestApiHandler);

        });
    });

    describe("addHandler", () => {
        it("Add handler and then getHandler should return same", () => {
            let handler: Partial<IHttpHandler> = {};
            let restApiConfig: Partial<RestApiConfiguration> = {};
            let httpConfiguration = new HttpConfiguration(<RestApiConfiguration>restApiConfig);
            httpConfiguration.addHandler("/newapi/*", <IHttpHandler>handler);
            const restApiHandler = httpConfiguration.getHandler("/newapi/product");
            expect(restApiHandler && restApiHandler[0]).to.equal("/newapi/*");
        });
    });

    describe("removeHandler", () => {
        it("should remove handler and will return true", () => {

            let restApiConfig: Partial<RestApiConfiguration> = {};
            let handler = new RestApiHandler(<RestApiConfiguration>restApiConfig);
            let httpConfiguration = new HttpConfiguration(<RestApiConfiguration>restApiConfig);
            const result = httpConfiguration.removeHandler(<IHttpHandler>handler);
            expect(result).to.equal(true);
        });

        it("After remove must return false", () => {
            let restApiConfig: Partial<RestApiConfiguration> = {};
            let handler = new RestApiHandler(<RestApiConfiguration>restApiConfig);
            let httpConfiguration = new HttpConfiguration(<RestApiConfiguration>restApiConfig);
            const removed = httpConfiguration.removeHandler(<IHttpHandler>handler);
            expect(removed).to.equal(true);
            const result = httpConfiguration.removeHandler(<IHttpHandler>handler);
            expect(result).to.equal(false);
        });
    });
});