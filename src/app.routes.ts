import { ProductController } from "./controllers/product.controller";
import { IRoute } from "./infrastructure/route";

export const routes: IRoute[] = [
    { path: "product", controller: ProductController }
];

