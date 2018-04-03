import { ProductRepository } from "../repository/product.repository";
import { Product } from "../models/product";
import { Controller, Authorize, Route, FilterDecorator } from "../decorators";
import { BaseController, HttpResponseMessage } from "../lifecycle";
import { HttpMethod } from "../common";
import { Optional } from "../validators";
import { TestFilter } from "../filters/test.filter";
import { StatusCode } from "../common/enums";

@Controller()
@Authorize(["Manager"])
export class ProductController extends BaseController {
    constructor(private productRepository: ProductRepository) {
        super();
    }

    @Route(HttpMethod.GET)
    public get(id: string, b: boolean, s: string, a: number, @Optional("object") o: number): void {
        const data = this.productRepository.getAllProducts();
        const httpResponseMessage = new HttpResponseMessage();
        httpResponseMessage.body = { data: data, id: id, b: b, s: s, a: a, o: o };
        httpResponseMessage.statusCode = StatusCode.Ok;
        httpResponseMessage.headers.set("SomeHeader", "value");
        httpResponseMessage.headers.set("header2", "value2");
        this.response.sendHttpResponse(httpResponseMessage);
    }

    @Route(HttpMethod.GET, "/{id}/getProduct/{sd}")
    public getProduct(id: number, sd: number, abc: string): Object {
        return { id: id, name: "samsung", sd: sd, abc: abc };
    }

    @Route(HttpMethod.GET, "{id}")
    public getProductById(id: number): Object {
        return { id: id, name: "samsung" };
    }

    @Authorize(["Manager"])
    @Route(HttpMethod.GET, "getProductDetails")
    public getProductDetails(queryString: boolean, @Optional() optional: string): Object {
        return { data: queryString, optional: optional };
    }

    @Route(HttpMethod.POST)
    @FilterDecorator(new TestFilter())
    public post(product: Product, id: string): Object {
        return { data: product, id: id };
    }

    @Route(HttpMethod.GET, "test-filter")
    @FilterDecorator(new TestFilter())
    public testFilter() {
        return { message: "filter test" };
    }
}