import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";

const GamePreview = ({ gameCode, previewTitle = "Game Preview" }) => {
  const [width, setWidth] = useState(600);
  const [resizing, setResizing] = useState(false);
  const [lastX, setLastX] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  const handleMouseDown = (e) => {
    setResizing(true);
    setLastX(e.clientX);
    e.preventDefault();
  };

  const handleMouseMove = (e) => {
    if (!resizing) return;
    const dx = e.clientX - lastX;
    setWidth((prev) => Math.max(300, prev + dx));
    setLastX(e.clientX);
  };

  const handleMouseUp = () => {
    setResizing(false);
  };

  useEffect(() => {
    if (resizing) {
      window.addEventListener("mousemove", handleMouseMove);
      window.addEventListener("mouseup", handleMouseUp);
    } else {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    }
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, [resizing]);

  const togglePreview = () => {
    setIsVisible(!isVisible);
  };

  if (!gameCode) return null;

  return (
    <>
      <button
        className="preview-toggle-button"
        onClick={togglePreview}
        aria-label={isVisible ? "Hide Preview" : "Show Preview"}
      >
        {isVisible ? (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M18 6L6 18M6 6l12 12"></path>
          </svg>
        ) : (
          <svg 
            width="28" 
            height="28" 
            viewBox="0 0 64 64" 
            fill="none" 
            stroke="#FFFFFF" 
            stroke-width="6" 
            stroke-linecap="round" 
            stroke-linejoin="round" 
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* <!-- Center Circle (the “eye”) --> */}
            <circle cx="32" cy="32" r="10" />

            {/* <!-- Upper Arc --> */}
            <path d="M12,32 A20,20 0 0,1 52,32" />
          </svg>

        )}
      </button>
      <div
        className={`game-preview dark ${!isVisible ? "hidden" : ""}`}
        style={{ width }}
      >
        <h3 className="preview-title">
          <span className="preview-heading dark">{previewTitle}</span>
          <button
            className="close-preview-mobile"
            onClick={() => setIsVisible(false)}
            style={{
              position: "absolute",
              right: "10px",
              top: "50%",
              transform: "translateY(-50%)",
              display: "none",
              "@media (max-width: 768px)": {
                display: "block",
              },
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M18 6L6 18M6 6l12 12"></path>
            </svg>
          </button>
        </h3>
        <div className="preview-container">
          <iframe
            className="game-iframe dark"
            srcDoc={gameCode}
            title="Game Preview"
            sandbox="allow-scripts"
          />
        </div>
      </div>
    </>
  );
};

const styles = {
  resizer: {
    position: "absolute",
    top: 0,
    right: 0,
    width: "10px",
    height: "100%",
    cursor: "ew-resize",
    backgroundColor: "transparent",
    zIndex: 10,
  },
};

GamePreview.propTypes = {
  gameCode: PropTypes.string.isRequired,
  previewTitle: PropTypes.string,
};

export default GamePreview;
