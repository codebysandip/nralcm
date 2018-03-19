import { Required } from "../validators/required.validator";

export class Product {
    @Required()
    public productName: string;
    @Required()
    public description: string;
}