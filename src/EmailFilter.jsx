import { useState } from "react";

// eslint-disable-next-line react/prop-types
const EmailFilter = ({ onFilterChange }) => {
  const [active, setActive] = useState("all");

  const handleOnclick = (filter) => {
    onFilterChange(filter);
    setActive(filter);
  };

  return (
    <div className="py-4 flex items-center text-lg">
      <p className="mr-5">Filter By</p>
      <button
        onClick={() => handleOnclick("all")}
        className={`mr-2 border border-gray-500 rounded-full px-4 py-1 flex items-center justify-center text-lg ${
          active === "all" ? "bg-blue-500" : ""
        }`}
      >
        All
      </button>
      <button
        onClick={() => handleOnclick("unread")}
        className={`mr-2 border border-gray-500 rounded-full px-4 py-1 flex items-center justify-center text-lg ${
          active === "unread" ? "bg-blue-500" : ""
        }`}
      >
        Unread
      </button>
      <button
        onClick={() => handleOnclick("read")}
        className={`mr-2 border border-gray-500 rounded-full px-4 py-1 flex items-center justify-center text-lg ${
          active === "read" ? "bg-blue-500" : ""
        }`}
      >
        Read
      </button>
      <button
        onClick={() => handleOnclick("favorites")}
        className={`mr-2 border border-gray-500 rounded-full px-4 py-1 flex items-center justify-center text-lg transition-colors ${
          active === "favorites" ? "bg-blue-500" : ""
        }`}
      >
        Favorites
      </button>
    </div>
  );
};

export default EmailFilter;
