import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./Layout";
import CreateRecipeView from "./views/CreateRecipeView";
import NotFoundView from "./views/NotFoundView";
import Home from "./views/Home";
import SearchView from "./views/SearchView";
import SurveyView from "./views/SurveyView";
import LogoutView from "./views/LogoutView";
import PageTitle from "./components/PageTitle";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route
            index
            element={
              <>
                <PageTitle title="Home" />
                <Home />
              </>
            }
          />
          <Route
            path="recipe"
            element={
              <>
                <PageTitle title="Neues Rezept" />
                <CreateRecipeView />
              </>
            }
          />
          <Route
            path="search"
            element={
              <>
                <PageTitle title="Suche" />
                <SearchView />
              </>
            }
          />
          <Route
            path="survey"
            element={
              <>
                <PageTitle title="Umfragen" />
                <SurveyView />
              </>
            }
          />
          <Route
            path="logout"
            element={
              <>
                <PageTitle title="Abmelden..." />
                <LogoutView />
              </>
            }
          />
          <Route
            path="*"
            element={
              <>
                <PageTitle title="404 - Not Found" />
                <NotFoundView />
              </>
            }
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
