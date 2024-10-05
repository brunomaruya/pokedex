import React from "react";
import logo from "../images/logo.png";

export default function Header() {
  return (
    <div>
      <header className="mb-20">
        <img src={logo} alt={logo} />
      </header>
    </div>
  );
}
