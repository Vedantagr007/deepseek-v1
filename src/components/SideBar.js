import React from "react";

const SideBar = ({
  sideBarOpen,
  toggleSideBar,
  toggleVersionPopUp,
  toggleSearch,
  logo,
  handleOverlayClick,
}) => {
  return (
    <>
      {sideBarOpen && (
        <div className="sidebar-overlay" onClick={handleOverlayClick}></div>
      )}
      <div
        className={`sidebar ${sideBarOpen ? "open" : ""} ${
          window.innerWidth <= 768 ? "half-open" : ""
        }`}
      >
        <div className="sidebar-content">
          <div className="sidebar-header">
            <div className="brand">
              <img src={logo} alt="GameCre8 Logo" className="brand-logo" />
              <h1>GameCre8</h1>
            </div>
            <button className="version-dropdown" onClick={toggleVersionPopUp}>
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
                <polyline points="6 9 12 15 18 9"></polyline>
              </svg>
              <span>Version Free</span>
            </button>
          </div>
          <button className="new-chat-button borderless">
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
              <line x1="12" y1="5" x2="12" y2="19"></line>
              <line x1="5" y1="12" x2="19" y2="12"></line>
            </svg>
            New chat
          </button>
          <div className="history-header">
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
              <circle cx="12" cy="12" r="10"></circle>
              <polyline points="12 6 12 12 16 14"></polyline>
            </svg>
            <span>History</span>
            <button className="history-search-button" onClick={toggleSearch}>
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
                <circle cx="11" cy="11" r="8"></circle>
                <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
              </svg>
            </button>
          </div>
          <button className="mobile-close-button" onClick={toggleSideBar}>
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