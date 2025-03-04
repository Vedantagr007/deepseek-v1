import React from "react";
import WelcomeMessage from "./WelcomeMessage";
import GameSelection from "./GameSelection";

const ChatContainer = ({
  showWelcome,
  selectedGames,
  toggleGameSelection,
  chatResponse,
  games,
}) => {
  return (
    <div className="chat-container">
      {showWelcome ? (
        <WelcomeMessage />
      ) : (
        <GameSelection
          selectedGames={selectedGames}
          toggleGameSelection={toggleGameSelection}
          games={games}
        />
      )}
      {chatResponse && (
        <div
          id="response"
          dangerouslySetInnerHTML={{ __html: chatResponse }}
        ></div>
      )}
    </div>
  );
};

export default ChatContainer;