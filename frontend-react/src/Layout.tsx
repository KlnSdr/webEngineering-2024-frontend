import { Outlet, Link } from "react-router-dom";
import "./style/boostrapOverride.scss";
import "bootstrap-icons/font/bootstrap-icons.css";
import "./style/App.css";

function Layout() {
  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
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
            <li className="nav-item">
              <Link className="nav-link" to="/logout">
                Abmelden
              </Link>
            </li>
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
