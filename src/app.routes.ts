import { ProductController } from "./controllers/product.controller";
import { UserController } from "./controllers/user.controller";
import { IRoute } from "./common";

export const routes: IRoute[] = [
    { path: "product", controller: ProductController },
    { path: "user", controller: UserController }
];
