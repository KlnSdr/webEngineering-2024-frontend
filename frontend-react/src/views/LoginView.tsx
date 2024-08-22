// import { useEffect } from "react";
// import { UserService } from "../services/UserService";

import { Button } from "react-bootstrap";
import { UserService } from "../services/UserService";

function LoginView() {
  return (
    <div
      className="d-flex justify-content-center mt-5"
      style={{ marginTop: "25%" }}
    >
      <div className="card">
        <div className="card-header">Anmelden</div>
        <div className="card-body">
          <p className="card-text">
            Um alle Features verwenden zu können müssen Sie sich anmelden.
          </p>
          <div className="btn-group" role="group">
            <Button onClick={UserService.doLogin}>
              <i className="bi bi-gitlab"></i> Login mit GitLab
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginView;
