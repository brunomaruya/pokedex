import React from "react";
import pokeball from "../images/pokeball.png";

export default function Loading() {
  return (
    <div className="absolute inset-0 flex items-center justify-center">
      <img
        src={pokeball}
        className="rotate-infinite w-24 h-24 shadow-custom-xl rounded-full"
        alt="Loading..."
      />
    </div>
  );
}
