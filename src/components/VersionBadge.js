import React from "react";

const VersionBadge = ({ toggleVersionPopup }) => {
  return (
    <div className="version-badge" onClick={toggleVersionPopup}>
      Version - free
    </div>
  );
};

export default VersionBadge;