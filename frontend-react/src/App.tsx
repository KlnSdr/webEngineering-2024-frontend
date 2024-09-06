import {Routes, Route, useSearchParams} from "react-router-dom";
import Layout from "./Layout";
import CreateRecipeView from "./views/CreateRecipeView";
import NotFoundView from "./views/NotFoundView";
import HomePage from "./views/HomePage";
import SearchView from "./views/SearchView";
import SurveyDetailView from "./views/SurveyDetailView";
import LogoutView from "./views/LogoutView";
import LoginView from "./views/LoginView";
import PageTitle from "./components/PageTitle";
import RecipeDetailView from "./views/RecipeDetailView";
import CreateSurveyView from "./views/CreateSurveyView";
import EditRecipeView from "./views/RecipeEditView";
import SurveyHub from "./views/SurveyHub";
import {useEffect} from "react";
import {UserService} from "./services/UserService";
import SurveyEditView from "./views/SurveyEditView";

function App() {
    const [searchParams, setSearchParams] = useSearchParams();

    useEffect(() => {
        if (searchParams.get('token')) {
            const token = searchParams.get('token')!;
            localStorage.setItem("token", token);
            window.location.assign("/");
        } else {
            localStorage.getItem("token") && UserService.loadUserInfo(localStorage.getItem("token")!);
        }
    }, []);

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
                          <CreateRecipeView  recipe={null}/>
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
                    path="edit/:id"
                    element={
                        <>
                        <PageTitle title="Rezept bearbeiten" />
                        <EditRecipeView/>
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
              <SearchView/>
            </>
          }
        />
      <Route path="survey" >
        <Route
            index
            element={
                <>
                    <PageTitle title="Umfragen" />
                    <SurveyHub />
                </>
        }
        />

          <Route
              path="new"
              element={
                  <>
                      <PageTitle title="Neue Umfragen" />
                      <CreateSurveyView survey={null} />
                  </>
              }
          />
          <Route
              path="view/:id"
              element={
                  <>
                      <PageTitle title="Umfragen" />
                      <SurveyDetailView />
                  </>
              }
          />
          <Route
                path="edit/:id"
                element={
                    <>
                        <PageTitle title="Umfrage bearbeiten" />
                        <SurveyEditView/>
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
