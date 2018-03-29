import "mocha";
import { expect } from "chai";
import { RestApiConfiguration } from "./rest-api.configuration";
import { IFilter } from "..";
import { IRoute } from "../../common";

describe("RestApiConfiguration", () => {
    let filter: Partial<IFilter> = {};
    describe("addFilter", () => {
        it("should add filter and length of RestApiConfiguration.Filters must be 1", () => {
            let restApiConfiguration = new RestApiConfiguration();
            restApiConfiguration.addFilter(<IFilter>filter);

            let filters = restApiConfiguration.Filters;

            expect(filters.length).to.equal(1);
        });
    });

    describe("addRoutes", () => {
        it("adding 1 route must add 1", () => {
            let routes: Partial<IRoute>[] = [
                {
                path: "demo"}
            ];

            let restApiConfiguration = new RestApiConfiguration();
            restApiConfiguration.addRoutes(<IRoute[]>routes);
            expect(restApiConfiguration.routes.length).to.equal(1);
        });
    });
});