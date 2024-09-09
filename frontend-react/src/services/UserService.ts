import {CurrentUser, User} from "../types/Users";
import {jwtDecode} from "jwt-decode";
import {request} from "./Requests";

/**
 * Service class for handling user-related operations.
 */
class UserService {
  /**
   * The backend URL for the user service.
   * @type {string}
   * @private
   */
  private static backendURL: string =
    process.env.REACT_APP_BACKEND_URL || "http://localhost:13000";

  /**
   * Cached user information.
   * @type {CurrentUser | null}
   * @private
   */
  private static userInfo: CurrentUser | null = null;

  /**
   * Logs out the current user by removing the token and redirecting to the logout URL.
   */
  static doLogout() {
    localStorage.removeItem("token");
    window.location.assign(`${UserService.backendURL}/users/logout`);
  }

  /**
   * Initiates the login process by redirecting to the OAuth2 authorization URL.
   */
  static doLogin() {
    window.location.assign(
      `${UserService.backendURL}/oauth2/authorization/gitlab`
    );
  }

  /**
   * Retrieves the current user's information.
   * @returns {Promise<any>} A promise that resolves to the current user's information.
   */
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

  /**
   * Retrieves a user by their URI.
   * @param {string} uri - The URI of the user.
   * @returns {Promise<User>} A promise that resolves to the user.
   */
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

  /**
   * Checks if the user is logged in.
   * @returns {Promise<boolean>} A promise that resolves to a boolean indicating if the user is logged in.
   */
  static isLoggedIn(): Promise<boolean> {
    return new Promise<boolean>((resolve) => {
      UserService.init().then((_) => resolve(UserService.userInfo !== null));
    });
  }

  /**
   * Loads the user information from the given token.
   * @param {string} token - The JWT token.
   * @private
   */
  static loadUserInfo(token: string) {
    UserService.userInfo = jwtDecode<CurrentUser>(token);
  }

  /**
   * Initializes the user service by loading the user information.
   * @returns {Promise<void>} A promise that resolves when the initialization is complete.
   * @private
   */
  private static init(): Promise<void> {
    return new Promise((resolve) => {
      UserService.getUserInfo()
        .then((_) => resolve())
        .catch((_) => resolve());
    });
  }
}

export { UserService };