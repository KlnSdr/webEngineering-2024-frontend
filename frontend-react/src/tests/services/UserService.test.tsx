import {UserService} from "../../services/UserService";

describe('UserServiceTests', () => {
    it("redirects to logout URL on doLogout", () => {
        // @ts-ignore
        delete window.location;
        window.location = {assign: jest.fn()} as any;
        UserService.doLogout();
        expect(window.location.assign).toHaveBeenCalledWith("http://localhost:13000/users/logout");
    });

    it("redirects to login URL on doLogin", () => {
        // @ts-ignore
        delete window.location;
        window.location = {assign: jest.fn()} as any;
        UserService.doLogin();
        expect(window.location.assign).toHaveBeenCalledWith("http://localhost:13000/oauth2/authorization/gitlab");
    });

    it("resolves user info if already cached", async () => {
        UserService["userInfo"] = {name: "Test User"};
        const userInfo = await UserService.getUserInfo();
        expect(userInfo).toEqual({name: "Test User"});
    });

    it("fetches and caches user info if not cached", async () => {
        UserService["userInfo"] = null;
        global.fetch = jest.fn().mockResolvedValue({
            ok: true, json: jest.fn().mockResolvedValue({name: "Test User"}),
        });
        const userInfo = await UserService.getUserInfo();
        expect(userInfo).toEqual({name: "Test User"});
        expect(UserService["userInfo"]).toEqual({name: "Test User"});
    });

    it("rejects if user info fetch fails", async () => {
        UserService["userInfo"] = null;
        global.fetch = jest.fn().mockResolvedValue({ok: false});
        await expect(UserService.getUserInfo()).rejects.toThrow("could not load user info");
    });

    it("resolves true if user is logged in", async () => {
        UserService["userInfo"] = {name: "Test User"};
        const isLoggedIn = await UserService.isLoggedIn();
        expect(isLoggedIn).toBe(true);
    });

    it("resolves false if user is not logged in", async () => {
        UserService["userInfo"] = null;
        const isLoggedIn = await UserService.isLoggedIn();
        expect(isLoggedIn).toBe(false);
    });
});
