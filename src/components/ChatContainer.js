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

  const processMessage = (content) => {
    const codeRegex = /```(\w+)?\n([\s\S]*?)```/g;
    const parts = [];
    let lastIndex = 0;
    let match;

    while ((match = codeRegex.exec(content)) !== null) {
      if (match.index > lastIndex) {
        parts.push({
          type: 'text',
          content: content.slice(lastIndex, match.index)
        });
      }

      parts.push({
        type: 'code',
        language: match[1] || 'javascript',
        content: match[2].trim()
      });

      lastIndex = match.index + match[0].length;
    }

    if (lastIndex < content.length) {
      parts.push({
        type: 'text',
        content: content.slice(lastIndex)
      });
    }

    return parts;
  };

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