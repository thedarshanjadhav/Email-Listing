import { useState } from "react";

// eslint-disable-next-line react/prop-types
const EmailFilter = ({ onFilterChange }) => {
  const [active, setActive] = useState("all");

  const handleOnclick = (filter) => {
    onFilterChange(filter);
    setActive(filter);
  };

  return (
    <div className="py-3 flex items-center text-lg ml-6 mt-3">
      <p className="mr-5">Filter By</p>
      <button
        onClick={() => handleOnclick("all")}
        className={`mr-2 border border-[#CFD2DC] rounded-full px-4 py-1 flex items-center justify-center text-lg ${
          active === "all" ? "bg-[#E1E4EA]" : ""
        }`}
      >
        All
      </button>
      <button
        onClick={() => handleOnclick("unread")}
        className={`mr-2 border border-[#CFD2DC] rounded-full px-4 py-1 flex items-center justify-center text-lg ${
          active === "unread" ? "bg-[#E1E4EA]" : ""
        }`}
      >
        Unread
      </button>
      <button
        onClick={() => handleOnclick("read")}
        className={`mr-2 border border-[#CFD2DC] rounded-full px-4 py-1 flex items-center justify-center text-lg ${
          active === "read" ? "bg-[#E1E4EA]" : ""
        }`}
      >
        Read
      </button>
      <button
        onClick={() => handleOnclick("favorites")}
        className={`mr-2 border border-[#CFD2DC] rounded-full px-4 py-1 flex items-center justify-center text-lg transition-colors ${
          active === "favorites" ? "bg-[#E1E4EA]" : ""
        }`}
      >
        Favorites
      </button>
    </div>
  );
};

export default EmailFilter;
