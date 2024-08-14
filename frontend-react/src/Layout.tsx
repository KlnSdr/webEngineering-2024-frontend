import { Outlet, Link } from "react-router-dom";
import "./style/boostrapOverride.scss";
import "bootstrap-icons/font/bootstrap-icons.css";
import "./style/App.css";

function Layout() {
  return (
    <>
      <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/recipe">neues Rezept</Link>
          </li>
          <li>
            <Link to="/search">Suche</Link>
          </li>
          <li>
            <Link to="/survey">Umfrage</Link>
          </li>
          <li>
            <Link to="/logout">Abmelden</Link>
          </li>
        </ul>
      </nav>

      <div className="App">
        <Outlet />
      </div>
    </>
  );
}

export default Layout;
