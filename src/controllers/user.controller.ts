import { BaseController } from "../lifecycle";
import { Controller, Route } from "../decorators";
import { User } from "../models/user";
import { HttpMethod } from "../common";

@Controller()
export class UserController extends BaseController {
    private static allUsers: User[] = [];

    @Route(HttpMethod.POST)
    public post(user: User) {
        UserController.allUsers.push(user);
        return true;
    }

    @Route(HttpMethod.GET)
    public get() {
        return UserController.allUsers;
    }
}