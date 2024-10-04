import "./index.css";
import "./App.css";
import { Route, Router, Routes } from "react-router-dom";
import Home from "./page/Home";
import PokemonProfile from "./page/PokemonProfile";

function App() {
  <Router>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/pokemon/:id" element={<PokemonProfile />} />
    </Routes>
  </Router>;
}

export default App;
