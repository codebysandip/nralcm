import { AuthPrinciple } from "../lifecycle/security/AuthPrinciple";

export class JwtAuthPrinciple extends AuthPrinciple {

    constructor(userId: string, roles: string[]) {
        super(userId, roles);
    }

    public isAuthorized(roles: string[]): boolean {
        let isFoundRoles = false;
        roles.forEach(role => {
            if (this.roles.findIndex(r => r === role) === -1) {
                isFoundRoles = false;
            } else {
                isFoundRoles = true;
            }
        });
        return isFoundRoles;
    }
}