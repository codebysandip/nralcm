import { Required } from "../validators";

export class User {
    @Required()
    firstName: string;

    @Required("Last name")
    lastName: string;
}