import React from "react";
import Header from "./Header";
import ChatContainer from "./ChatContainer";
import MessageInput from "./MessageInput";
import VersionBadge from "./VersionBadge";
import SearchPopUp from "./SearchPopUp";
import VersionPopUp from "./VersionPopUp";

const MainContent = ({
  darkMode,
  toggleDarkMode,
  sidebarOpen,
  toggleSidebar,
  searchOpen,
  toggleSearch,
  versionPopupOpen,
  toggleVersionPopup,
  showWelcome,
  selectedGames,
  toggleGameSelection,
  chatResponse,
  message,
  setMessage,
  handleSendMessage,
  games,
  logo,
}) => {
  return (
    <div className="main-content">
      <Header
        darkMode={darkMode}
        toggleDarkMode={toggleDarkMode}
        toggleSidebar={toggleSidebar}
        toggleSearch={toggleSearch}
        logo={logo}
      />
      <ChatContainer
        showWelcome={showWelcome}
        selectedGames={selectedGames}
        toggleGameSelection={toggleGameSelection}
        chatResponse={chatResponse}
        games={games}
      />
      <MessageInput
        message={message}
        setMessage={setMessage}
        handleSendMessage={handleSendMessage}
      />
      <VersionBadge toggleVersionPopup={toggleVersionPopup} />
      {searchOpen && <SearchPopUp toggleSearch={toggleSearch} />}
      {versionPopupOpen && <VersionPopUp toggleVersionPopup={toggleVersionPopup} />}
    </div>
  );
};

export default MainContent;