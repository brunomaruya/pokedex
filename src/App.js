import "./index.css";
import "./App.css";
import axios from "axios";
import { useEffect, useState } from "react";
import logo from "./images/logo.png";
import logo2 from "./images/logo2.png";

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
    <div className="h-screen bg-backgroundRed">
      <header className="p-5 pb-20">
        <img src={logo} alt={logo} />
      </header>
      <section className="w-full ">
        <img className="m-auto " src={logo2} alt={logo} />
      </section>
    </div>
  );
}

export default App;
