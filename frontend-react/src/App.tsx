import { Routes, Route } from "react-router-dom";
import Layout from "./Layout";
import CreateRecipeView from "./views/CreateRecipeView";
import NotFoundView from "./views/NotFoundView";
import HomePage from "./views/HomePage";
import SearchView from "./views/SearchView";
import SurveyView from "./views/SurveyView";
import LogoutView from "./views/LogoutView";
import LoginView from "./views/LoginView";
import PageTitle from "./components/PageTitle";
import RecipeDetailView from "./views/RecipeDetailView";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route
          index
          element={
            <>
              <PageTitle title="Home" />
              <HomePage />
            </>
          }
        />
        <Route path="recipe" >
              <Route
                  path="new"
                  element={
                      <>
                          <PageTitle title="Neues Rezept" />
                          <CreateRecipeView />
                      </>
                  }
              />
              <Route
                  path="view/:id"
                  element={
                      <>
                          <PageTitle title="Rezeptedetailansicht" />
                          <RecipeDetailView />
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
        <Route
          path="search"
          element={
            <>
              <PageTitle title="Suche" />
              <RecipeDetailView />
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
          path="login"
          element={
            <>
              <PageTitle title="Anmelden" />
              <LoginView />
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
  );
}

export default App;
