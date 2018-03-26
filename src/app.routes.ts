import { ProductController } from "./controllers/product.controller";
import { IRoute } from "./infrastructure/route";
// import { BaseController } from "./infrastructure/base-controller";

export const routes: IRoute[] = [
    { path: "product", controller: ProductController }
];

// export const controllers: BaseController[] = [
//     ProductController
// ];