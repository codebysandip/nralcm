import "mocha";
import { expect } from "chai";
import { RestApiConfiguration } from "./rest-api.configuration";
import { IFilter } from "..";
import { IRoute } from "../../common";

describe("RestApiConfiguration", () => {
    let filter: Partial<IFilter> = {};
    describe("addFilter", () => {
        it("should add filter and length of RestApiConfiguration.Filters must be 1", () => {
            RestApiConfiguration.addFilter(<IFilter>filter);

            let filters = RestApiConfiguration.Filters;

            expect(filters.length).to.equal(1);
        });
    });

    describe("addRoutes", () => {
        it("adding 1 route must add 1", () => {
            let routes: Partial<IRoute>[] = [
                {
                path: "demo"}
            ];

            RestApiConfiguration.addRoutes(<IRoute[]>routes);
            expect(RestApiConfiguration.routes.length).to.equal(1);
        });
    });
});