/**
 * AuthPrinciple class
 */
export abstract class AuthPrinciple {
    /**
     * userId of User
     * userId can be email or GUID
     */
    public userId: string;

    /**
     * Roles of User
     */
    public roles: string[];
    private _isAuthenticated: boolean = false;

    constructor(userId: string, roles: string[]) {
        this.userId = userId;
        this.roles = roles;
        this._isAuthenticated = true;
    }
    /**
     * abstract method to implement. Check for authorization of user
     * based on roles
     * @param roles Roles of User
     */
    public abstract isAuthorized(roles: string[]): boolean;

    // tslint:disable-next-line:typedef
    get isAuthenticated() {
        return this._isAuthenticated;
    }
}