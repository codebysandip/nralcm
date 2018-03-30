import { Required } from "../validators";

export class Product {
    @Required()
    public productName: string;
    @Required()
    public description: string;
}