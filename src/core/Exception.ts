import { HttpResponseMessage } from "../lifecycle";

export abstract class Exception<T> {
    abstract httpResponseMessage: HttpResponseMessage<T>;
    constructor(){
        // this._httpResponseMessage = httpResponseMessage;
    };

    get HttpResponseMessage() {
        return this.httpResponseMessage;
    }
}