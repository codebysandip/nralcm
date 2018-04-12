import { SomeClass } from "./some.repository";
import { Repository } from "../decorators";
import { Observable } from "rxjs/Observable";
import { Observer } from "rxjs/Observer";
import { BadRequestException } from "../exceptions";

@Repository()
export class ProductRepository {
    constructor(private someClass: SomeClass) {
    }

    public getAllProducts(): Object {
        this.someClass.print();
        return [{ id: 1, name: "one plus" }];
    }

    public obsProduct(): Observable<number> {
        return Observable.create((obs: Observer<number>) => {
            throw new BadRequestException([`some error ${obs}`]);
            // obs.next(10);
        });
    }
}
