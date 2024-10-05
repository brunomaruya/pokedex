import React from "react";

export default function InfoCard({ label, value }) {
  return (
    <div className="w-full flex justify-between bg-buttonRed rounded-lg p-2 text-white">
      <div>{label} </div>
      <div>{value}</div>
    </div>
  );
}
