import React from "react";
import WelcomeMessage from "./WelcomeMessage";
import GameSelection from "./GameSelection";

const ChatContainer = ({
  showWelcome,
  selectedGames,
  toggleGameSelection,
  chatResponse,
  games,
  chats,
  currentChatId,
}) => {
  const currentChat = Array.isArray(chats) ? chats.find(chat => chat.id === currentChatId) : null;

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
      <div className="chat-messages">
        {currentChat?.messages.map((message, index) => (
          <div key={index} className={`chat-message ${message.role}`}>
            <div className="message-content">
              <div dangerouslySetInnerHTML={{ __html: message.content }}></div>
            </div>
          </div>
        ))}
      </div>
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