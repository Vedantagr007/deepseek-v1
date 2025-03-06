import React, { useState, useRef } from 'react';
import Prism from 'prismjs';
import 'prismjs/themes/prism-tomorrow.css';

const CodeEditor = ({ code, language }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [content, setContent] = useState(code);
  const textareaRef = useRef(null);

  const handleCopy = () => {
    navigator.clipboard.writeText(content);
  };

  const handleEdit = () => {
    setIsEditing(true);
    setTimeout(() => {
      textareaRef.current?.focus();
    }, 0);
  };

  const getLineNumbers = () => {
    const lines = content.split('\n');
    return lines.map((_, i) => i + 1).join('\n');
  };

  const highlightCode = () => {
    if (language) {
      return Prism.highlight(content, Prism.languages[language], language);
    }
    return content;
  };

  return (
    <div className="code-editor-container">
      <div className="code-editor-header">
        <div className="code-editor-title">
          <span>{language || 'text'}</span>
        </div>
        <div className="code-editor-controls">
          <button className="code-editor-button" onClick={handleEdit}>
            <svg width="16" height="16" viewBox="0 0 24 24">
              <path fill="currentColor" d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"/>
            </svg>
          </button>
          <button className="code-editor-button" onClick={handleCopy}>
            <svg width="16" height="16" viewBox="0 0 24 24">
              <path fill="currentColor" d="M16 1H4c-1.1 0-2 .9-2 2v14h2V3h12V1zm3 4H8c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h11c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2zm0 16H8V7h11v14z"/>
            </svg>
          </button>
        </div>
      </div>
      <div className="code-editor-content">
        <div className="code-editor-line-numbers">
          {getLineNumbers()}
        </div>
        {isEditing ? (
          <textarea
            ref={textareaRef}
            className="code-editor-textarea"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            onBlur={() => setIsEditing(false)}
            spellCheck="false"
          />
        ) : (
          <pre>
            <code 
              dangerouslySetInnerHTML={{ __html: highlightCode() }}
            />
          </pre>
        )}
      </div>
    </div>
  );
};

export default CodeEditor;