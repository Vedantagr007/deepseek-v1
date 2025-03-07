import React from "react";
import WelcomeMessage from "./WelcomeMessage";
import GameSelection from "./GameSelection";
import CodeEditor from "./CodeEditor";

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

      // Add code block
      parts.push({
        type: 'code',
        language: match[1] || 'text',
        content: match[2]
      });

      lastIndex = match.index + match[0].length;
    }

    // Add remaining text
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
              {processMessage(message.content).map((part, i) => (
                part.type === 'code' ? (
                  <CodeEditor 
                    key={i}
                    code={part.content}
                    language={part.language}
                  />
                ) : (
                  <div key={i} dangerouslySetInnerHTML={{ __html: part.content }} />
                )
              ))}
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