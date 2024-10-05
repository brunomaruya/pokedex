import React from "react";
import logo from "../images/logo.png";
import { Link } from "react-router-dom";

export default function Header() {
  return (
    <Link to="/">
      <header className="mb-20">
        <img src={logo} alt={logo} />
      </header>
    </Link>
  );
}
