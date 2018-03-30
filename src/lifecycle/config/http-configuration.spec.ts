import "mocha";
import { expect } from "chai";
import { HttpConfiguration } from "./http-configuration";
import { IHttpHandler } from "..";

describe("HttpConfiguration", () => {
    describe("getHandler", () => {
        it("getHandler must return undefined when not any handler added", () => {
            const restApiHandler = HttpConfiguration.getHandler("/api/product");
            expect(restApiHandler).to.equal(undefined);

        });
    });

    describe("addHandler", () => {
        it("Add handler and then getHandler should return same", () => {
            let handler: Partial<IHttpHandler> = {};
            HttpConfiguration.addHandler("/api/*", <IHttpHandler>handler);
            const restApiHandler = HttpConfiguration.getHandler("/api/product");
            expect(restApiHandler && restApiHandler[0]).to.equal("/api/*");
        });
    });

    describe("removeHandler", () => {
        it("should remove handler and will return true", () => {
            let handler: Partial<IHttpHandler> = {};

            const result = HttpConfiguration.removeHandler(<IHttpHandler>handler);
            expect(result).to.equal(true);
        });

        it("After remove must return false", () => {
            let handler: Partial<IHttpHandler> = {};
            const result = HttpConfiguration.removeHandler(<IHttpHandler>handler);
            expect(result).to.equal(false);
        });
    });
});