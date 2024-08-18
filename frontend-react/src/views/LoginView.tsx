// import { useEffect } from "react";
// import { UserService } from "../services/UserService";

import { Button } from "react-bootstrap";
import { UserService } from "../services/UserService";

function LoginView() {
  return <Button onClick={UserService.doLogin}>Login mit GitLab</Button>;
}

export default LoginView;
