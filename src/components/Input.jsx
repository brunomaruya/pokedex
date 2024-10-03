import React from "react";

export default function Input() {
  return (
    <div className="flex items-center gap-3 w-full">
      <input
        className="p-2 rounded-lg w-full  shadow-custom-xl"
        type="search"
        placeholder="Search eg, ditto or pikachu..."
      />
      <button className="p-2 rounded-lg bg-buttonRed text-white shadow-custom-xl">
        Search
      </button>
    </div>
  );
}
