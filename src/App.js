import "./index.css";
import "./App.css";
import axios from "axios";
import { useEffect, useState } from "react";
import logo from "./images/logo.png";
import logo2 from "./images/logo2.png";
import Input from "./components/Input";
import PokemonList from "./components/PokemonList";

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
    <div className="m-5">
      <header className="mb-20">
        <img src={logo} alt={logo} />
      </header>
      <section className="flex justify-center ">
        <div className=" container flex flex-col items-center ">
          <img src={logo2} alt={logo} className="mb-7" />
          <Input />
          <PokemonList data={data} />
        </div>
      </section>
    </div>
  );
}

export default App;
