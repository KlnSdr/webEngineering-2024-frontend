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

    // it("resolves user info if already cached", async () => {
    //     UserService["userInfo"] = {name: "Test User"};
    //     const userInfo = await UserService.getUserInfo();
    //     expect(userInfo).toEqual({name: "Test User"});
    // });

    it("returns userdata", async () => {
        UserService["userInfo"] = {username: "Test User", id: 42, profileImage: "example.com/image.mp3"};
        const userInfo = await UserService.getUserInfo();
        expect(userInfo).toEqual({username: "Test User", id: 42, profileImage: "example.com/image.mp3"});
    });

    it("returns null when no user info is available", async () => {
        UserService["userInfo"] = null;
        const userInfo = await UserService.getUserInfo();
        expect(userInfo).toBeNull();
    });

    // it("resolves true if user is logged in", async () => {
    //     UserService["userInfo"] = {name: "Test User"};
    //     const isLoggedIn = await UserService.isLoggedIn();
    //     expect(isLoggedIn).toBe(true);
    // });

    it("resolves false if user is not logged in", async () => {
        UserService["userInfo"] = null;
        const isLoggedIn = await UserService.isLoggedIn();
        expect(isLoggedIn).toBe(false);
    });
});
