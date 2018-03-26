import { Authorize } from "../decorators/authorize.decorator";
import { ProductRepository } from "../repository/product.repository";
import { Product } from "../models/product";
import { BaseController } from "../infrastructure/base-controller";
import { Route } from "../decorators/route.decorator";
import { Optional } from "../validators/optional.validator";
import { HttpMethod } from "../infrastructure/http-method.enum";
import { FilterDecorator } from "../decorators/filter.decorator";
import { TestFilter } from "../filters/test.filter";
import { Controller } from "../decorators/controller.decorator";

@Controller()
@Authorize(["Manager"])
export class ProductController extends BaseController {
    constructor(private productRepository: ProductRepository) {
        super();
    }

    @Route(HttpMethod.GET)
    public get(id: string, b: boolean, s: string, a: number, @Optional("object") o: number) {
        const data = this.productRepository.getAllProducts();
        return { data: data, id: id, b: b, s: s, a: a, o: o};
    }

    @Route(HttpMethod.GET, "/{id}/getProduct/{sd}")
    public getProduct(id: number, sd: number, abc: string) {
        return { id: id, name: "samsung", sd: sd, abc: abc };
    }

    @Route(HttpMethod.GET, "{id}")
    public getProductById(id: number) {
        return { id: id, name: "samsung" };
    }

    @Authorize(["Manager"])
    @Route(HttpMethod.GET, "getProductDetails")
    public getProductDetails(queryString: boolean, @Optional() optional: string) {
        return { data: queryString, optional: optional };
    }

    @Route(HttpMethod.POST)
    @FilterDecorator(new TestFilter())
    public post(product: Product, id: string) {
        return { data: product, id: id };
    }
}