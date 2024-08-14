import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./Layout";
import CreateRecipeView from "./views/CreateRecipeView";
import NotFoundView from "./views/NotFoundView";
import Home from "./views/Home";
import SearchView from "./views/SearchView";
import SurveyView from "./views/SurveyView";
import LogoutView from "./views/LogoutView";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="recipe" element={<CreateRecipeView />} />
          <Route path="search" element={<SearchView />} />
          <Route path="survey" element={<SurveyView />} />
          <Route path="logout" element={<LogoutView />} />
          <Route path="*" element={<NotFoundView />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
