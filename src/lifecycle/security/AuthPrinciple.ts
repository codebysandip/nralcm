
export abstract class AuthPrinciple {
    public userId: string;
    public roles: string[];
    private _isAuthenticated: boolean = false;

    constructor(userId: string, roles: string[]) {
        this.userId = userId;
        this.roles = roles;
        this._isAuthenticated = true;
    }
    public abstract isAuthorized(roles: string[]): boolean;

    get isAuthenticated() {
        return this._isAuthenticated;
    }
}