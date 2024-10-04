import "./index.css";
import "./App.css";
import { Route, Router, Routes } from "react-router-dom";
import Home from "./page/Home";

function App() {
  <Router>
    <Routes>
      <Route path="/" element={<Home />} />
    </Routes>
  </Router>;
}

export default App;
