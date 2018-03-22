import { SomeClass } from "./some.repository";

export class ProductRepository {
    constructor(private someClass: SomeClass) {

    }

    public getAllProducts() {
        this.someClass.print();
        return [{ id: 1, name: "one plus"}];
    }
}
