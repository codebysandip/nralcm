import { SomeClass } from "./some.repository";
import { Repository } from "../decorators";

@Repository()
export class ProductRepository {
    constructor(private someClass: SomeClass) {
    }

    public getAllProducts(): Object {
        this.someClass.print();
        return [{ id: 1, name: "one plus"}];
    }
}
