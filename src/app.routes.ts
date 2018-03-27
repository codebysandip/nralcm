import { ProductController } from "./controllers/product.controller";
import { IRoute } from "./common";

export const routes: IRoute[] = [
    { path: "product", controller: ProductController }
];
