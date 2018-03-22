import { Authorize } from "../decorators/authorize.decorator";
import { ProductRepository } from "../repository/product.repository";
import { Product } from "../models/product";
import { BaseController } from "../infrastructure/base-controller";
import { Route } from "../decorators/route.decorator";
import { Optional } from "../validators/optional.validator";
import { HttpMethod } from "../infrastructure/http-method.enum";

@Authorize(["admin"])
export class ProductController extends BaseController {
    constructor(private productRepository: ProductRepository) {
        super();
    }

    @Route("getAllProduct", HttpMethod.GET)
    public getAllProducts(id: string, b: boolean, s: string, a: number, @Optional("object") o: number) {
        const data = this.productRepository.getAllProducts();
        return { data: data, id: id, b: b, s: s, a: a, o: o};
    }

    @Route("/{id}/getProduct/{sd}", HttpMethod.GET)
    public getProduct(id: number, sd: number, abc: string) {
        return { id: id, name: "samsung", sd: sd, abc: abc };
    }

    @Route("getProductDetails", HttpMethod.GET)
    public getProductDetails(queryString: boolean, @Optional() optional: string) {
        return { data: queryString, optional: optional };
    }

    @Route("saveproduct", HttpMethod.POST)
    public saveProduct(product: Product, id: string) {
        return this.response.send({ data: product, id: id });
    }
}

