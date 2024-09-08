import {CurrentUser, User} from "../types/Users";
import {jwtDecode} from "jwt-decode";
import {request} from "./Requests";

class UserService {
  private static backendURL: string =
    process.env.REACT_APP_BACKEND_URL || "http://localhost:13000";
  private static userInfo: CurrentUser | null = null;

  static doLogout() {
    localStorage.removeItem("token");
    window.location.assign(`${UserService.backendURL}/users/logout`);
  }

  static doLogin() {
    window.location.assign(
      `${UserService.backendURL}/oauth2/authorization/gitlab`
    );
  }

  static getUserInfo(): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      if (UserService.userInfo !== null) {
        resolve(UserService.userInfo);
        return;
      }

      if (localStorage.getItem("token")) {
          this.loadUserInfo(localStorage.getItem("token")!);
      }

      resolve(UserService.userInfo);
    });
  }

  static getUser(uri: string): Promise<User> {
      return new Promise((resolve, reject) => {
          request(`${this.backendURL}${uri}`, {})
          .then(response => {
              if (!response.ok) {
                  throw new Error("could not get user with uri " + uri);
              }
              return response.json();
          })
          .then(resolve)
          .catch(_ => {reject()});
      });
  }

  static isLoggedIn(): Promise<boolean> {
    return new Promise<boolean>((resolve) => {
      UserService.init().then((_) => resolve(UserService.userInfo !== null));
    });
  }

  static loadUserInfo(token: string) {
    UserService.userInfo = jwtDecode<CurrentUser>(token);
  }

  private static init(): Promise<void> {
    return new Promise((resolve) => {
      UserService.getUserInfo()
        .then((_) => resolve())
        .catch((_) => resolve());
    });
  }
}

export { UserService };
