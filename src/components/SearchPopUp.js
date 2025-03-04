import React from "react";

const SearchPopUp = ({ toggleSearch }) => {
  return (
    <div className="search-popup">
      <div className="search-popup-content">
        <input type="text" placeholder="Search..." />
        <button onClick={toggleSearch}>Close</button>
      </div>
    </div>
  );
};

export default SearchPopUp;