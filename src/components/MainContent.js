import React, { useState, useEffect } from "react";
import Header from "./Header";
import ChatContainer from "./ChatContainer";
import MessageInput from "./MessageInput";
import VersionBadge from "./VersionBadge";
import SearchPopUp from "./SearchPopUp";
import VersionPopUp from "./VersionPopUp";
import GamePreview from './GamePreview';

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
  logo
}) => {
  const [gameCode, setGameCode] = useState('');

  const processResponse = (response) => {
    // Extract game code from response
    const gameMatch = response.match(/```html([\s\S]*?)```/);
    if (gameMatch) {
      setGameCode(gameMatch[1].trim());
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await handleSendMessage();
    processResponse(chatResponse);
  };

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
      {gameCode && <GamePreview gameCode={gameCode} />}
      <VersionBadge toggleVersionPopup={toggleVersionPopup} />
      {searchOpen && <SearchPopUp toggleSearch={toggleSearch} />}
      {versionPopupOpen && <VersionPopUp toggleVersionPopup={toggleVersionPopup} />}
    </div>
  );
};

export default MainContent;