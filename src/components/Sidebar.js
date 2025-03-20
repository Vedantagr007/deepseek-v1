import React from "react";

const SideBar = ({
  sideBarOpen,
  toggleSideBar,
  toggleVersionPopUp,
  toggleSearch,
  logo,
  handleOverlayClick,
  darkMode,
  chats,
  currentChatId,
  setCurrentChatId,
  startNewChat,
}) => {
  return (
    <>
      {sideBarOpen && (
        <div className="sidebar-overlay" onClick={handleOverlayClick}></div>
      )}
      <div
        className={`sidebar ${darkMode ? "bg-gray-800" : "bg-gray-100"} ${
          sideBarOpen ? "open" : ""
        } ${window.innerWidth <= 768 ? "half-open" : ""}`}
      >
        <div className="sidebar-content">
          <div className="sidebar-header">
            <div className="brand">
              <img src={logo} alt="GameCre8 Logo" className="brand-logo" />
              <h1
                style={{
                  fontWeight: "bold",
                  fontSize: "1.2em",
                  background: "linear-gradient(to right, #8b5cf6, #ec4899)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                GameCre8
              </h1>
            </div>
          </div>
          <div className="button-group space-y-0">
            <button
              className="new-chat-button borderless w-full mb-0 p-0"
              onClick={startNewChat}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                className={darkMode ? "stroke-white" : "stroke-black"}
              >
                <path
                  d="M4 2C2.89543 2 2 2.89543 2 4V16C2 17.1046 2.89543 18 4 18H8L12 22L16 18H20C21.1046 18 22 17.1046 22 16V4C22 2.89543 21.1046 2 20 2H4Z"
                  stroke="currentColor"
                  strokeWidth="2"
                />
              </svg>
              <span className={darkMode ? "text-white" : "text-black"}>
                New chat
              </span>
            </button>
            <button className="new-chat-button borderless w-full mb-0 p-0">
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
                className={darkMode ? "stroke-white" : "stroke-black"}
              >
                <circle cx="12" cy="12" r="10"></circle>
                <polyline points="12 6 12 12 16 14"></polyline>
              </svg>
              <span
                className={darkMode ? "text-white" : "text-black"}
                style={{ transform: "translateX(5px)" }}
              >
                History
              </span>
            </button>
          </div>
          <button className="mobile-close-button mt-1" onClick={toggleSideBar}>
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
              className={darkMode ? "stroke-white" : "stroke-black"}
            >
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        </div>
      </div>
    </>
  );
};

export default SideBar;
