import { SomeClass } from "./some.repository";
import { Repository } from "../decorators";
import { Observable } from "rxjs/Observable";
import { Observer } from "rxjs/Observer";

@Repository()
export class ProductRepository {
    constructor(private someClass: SomeClass) {
    }

    public getAllProducts(): Object {
        this.someClass.print();
        return [{ id: 1, name: "one plus"}];
    }

    public obsProduct(): Observable<number> {
        return Observable.create((obs: Observer<number>) => {
            setTimeout(() => {
                obs.next(10);
            }, 100);
        });
    }
}
