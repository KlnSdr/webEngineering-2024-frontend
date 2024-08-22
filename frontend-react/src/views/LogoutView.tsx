import { useEffect } from "react";
import { UserService } from "../services/UserService";

function LogoutView() {
  useEffect(() => {
    UserService.doLogout();
  }, []);
  return null;
}

export default LogoutView;
