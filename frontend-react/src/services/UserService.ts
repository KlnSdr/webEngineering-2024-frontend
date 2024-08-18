class UserService {
  private static backendURL: string =
    process.env.REACT_APP_BACKEND_URL || "http://localhost:13000";
  private static userInfo: any | null = null;

  static doLogout() {
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

      fetch(`${UserService.backendURL}/users/current`, {
        credentials: "include",
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error("could not load user info");
          }
          return response.json();
        })
        .then((data: any) => {
          UserService.userInfo = data;
          resolve(UserService.userInfo);
        })
        .catch((reason: any) => {
          console.error(reason);
          reject(reason);
        });
    });
  }

  static isLoggedIn(): Promise<boolean> {
    return new Promise<boolean>((resolve) => {
      UserService.init().then((_) => resolve(UserService.userInfo !== null));
    });
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
