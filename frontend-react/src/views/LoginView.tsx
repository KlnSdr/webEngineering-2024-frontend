// import { useEffect } from "react";
// import { UserService } from "../services/UserService";

import { Button } from "react-bootstrap";
import { UserService } from "../services/UserService";

function LoginView() {
  return (
    <div className="btn-group" role="group">
      <Button onClick={UserService.doLogin}>
        <i className="bi bi-gitlab"></i> Login mit GitLab
      </Button>
    </div>
  );
}

export default LoginView;
