import "./index.css";
import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./page/Home";
import PokemonProfile from "./page/PokemonProfile";
import Header from "./components/Header";
function App() {
  return (
    <Router>
      <main className="m-5">
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/pokemon/:id" element={<PokemonProfile />} />
        </Routes>
      </main>
    </Router>
  );
}

export default App;
