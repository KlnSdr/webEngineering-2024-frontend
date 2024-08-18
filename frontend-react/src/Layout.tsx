import { Outlet, Link } from "react-router-dom";
import "./style/boostrapOverride.scss";
import "bootstrap-icons/font/bootstrap-icons.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "./style/App.css";
import { useEffect, useState } from "react";
import { UserService } from "./services/UserService";

function Layout() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    UserService.getUserInfo()
      .then((userInfo: any) => setUser(userInfo))
      .catch((reason) => console.error(reason));
  }, []);

  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item">
              <Link className="nav-link" to="/">
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/recipe">
                neues Rezept
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/search">
                Suche
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/survey">
                Umfrage
              </Link>
            </li>
            {user ? (
              <li className="nav-item">
                <Link className="nav-link" to="/logout">
                  Abmelden
                </Link>
              </li>
            ) : (
              <li className="nav-item">
                <Link className="nav-link" to="/login">
                  Anmelden
                </Link>
              </li>
            )}
          </ul>
        </div>
      </nav>

      <div className="App">
        <Outlet />
      </div>
    </>
  );
}

export default Layout;
