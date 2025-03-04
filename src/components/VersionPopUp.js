import React from "react";

const VersionPopUp = ({ toggleVersionPopup }) => {
  return (
    <div className="version-popup">
      <div className="version-popup-content">
        <h3>Free Version Features</h3>
        <ul>
          <li>Play mobile games</li>
          <li>Prompting free</li>
          <li>1 month free</li>
        </ul>
        <button onClick={toggleVersionPopup}>Close</button>
      </div>
    </div>
  );
};

export default VersionPopUp;