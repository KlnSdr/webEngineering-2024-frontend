import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./Layout";
import CreateRecipeView from "./views/CreateRecipeView";
import Home from "./views/Home";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="recipe" element={<CreateRecipeView />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
