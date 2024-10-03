import "./index.css";
import "./App.css";
import axios from "axios";
import { useEffect, useState } from "react";
import logo from "./images/logo.png";

function App() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios
      .get("https://pokeapi.co/api/v2/pokemon/")
      .then((response) => {
        setData(response.data);
        setLoading(false);
      })
      .catch((error) => {
        setError(error);
        setLoading(false);
      });
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error</div>;
  return (
    <div className="">
      <header>
        <img src={logo} alt={logo} />
      </header>
    </div>
  );
}

export default App;
