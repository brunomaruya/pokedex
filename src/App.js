import "./index.css";
import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./page/Home";
import PokemonProfile from "./page/PokemonProfile";
import Header from "./components/Header";
import { SearchProvider } from "./context/SearchContext";
function App() {
  return (
    <SearchProvider>
      <Router>
        <main className="m-5">
          <Header />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/pokemon/:id" element={<PokemonProfile />} />
          </Routes>
        </main>
      </Router>
    </SearchProvider>
  );
}

export default App;
