import { useEffect } from "react";
import { UserService } from "../services/UserService";

/**
 * Component for logging out the user.
 *
 * This component triggers the logout process when it is mounted.
 * It uses the `useEffect` hook to call the `doLogout` method from `UserService`.
 *
 * @returns {null} This component does not render any UI.
 */
function LogoutView() {
  useEffect(() => {
    UserService.doLogout();
  }, []);
  return null;
}

export default LogoutView;