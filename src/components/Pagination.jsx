import {
  ArrowLeftIcon,
  ArrowRightCircleIcon,
  ArrowRightIcon,
} from "@heroicons/react/16/solid";
import React from "react";

export default function Pagination({
  setCurrentPage,
  currentPage,
  totalPages,
}) {
  return (
    <div className="flex items-center mt-7 gap-10 ">
      <button
        className="bg-white rounded-full p-2 shadow-custom-xl"
        onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
        disabled={currentPage === 1}
      >
        <ArrowLeftIcon className="w-12 h-12" />
      </button>
      <span className="text-white text-3xl">
        Page {currentPage} of {totalPages}
      </span>
      <button
        className="bg-white rounded-full p-2 shadow-custom-xl"
        onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
        disabled={currentPage === totalPages}
      >
        <ArrowRightIcon className="w-12 h-12" />
      </button>
    </div>
  );
}
