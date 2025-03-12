import React, { useState, useEffect } from 'react';
import Editor from '@monaco-editor/react';

const CodeEditor = ({ code, language }) => {
  const [displayedCode, setDisplayedCode] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [extractedCode, setExtractedCode] = useState('');

  // Function to extract code from markdown-style code blocks
  const extractCodeFromResponse = (text) => {
    const codeBlockRegex = /```(?:\w+)?\n([\s\S]*?)```/g;
    const matches = text.match(codeBlockRegex);
    
    if (matches) {
      // Extract code from the first code block found
      const codeContent = matches[0]
        .replace(/```\w*\n/, '') // Remove opening ```language
        .replace(/```$/, '')     // Remove closing ```
        .trim();
      return codeContent;
    }
    return text; // Return original text if no code block found
  };

  useEffect(() => {
    // Extract code when component receives new code prop
    const cleanCode = extractCodeFromResponse(code || '');
    setExtractedCode(cleanCode);
    
    // Reset states
    setDisplayedCode('');
    setCurrentIndex(0);

    if (cleanCode) {
      const typingInterval = setInterval(() => {
        setCurrentIndex((prevIndex) => {
          if (prevIndex >= cleanCode.length) {
            clearInterval(typingInterval);
            return prevIndex;
          }
          setDisplayedCode(cleanCode.substring(0, prevIndex + 1));
          return prevIndex + 1;
        });
      }, 30);

      return () => clearInterval(typingInterval);
    }
  }, [code]);

  return (
    <div className="code-editor-container rounded-md overflow-hidden border border-gray-700">
      <Editor
        height="200px"
        language={language || 'javascript'}
        theme="vs-dark"
        value={displayedCode}
        options={{
          readOnly: true,
          minimap: { enabled: false },
          fontSize: 14,
          lineNumbers: 'on',
          scrollBeyondLastLine: false,
          automaticLayout: true,
          padding: { top: 8, bottom: 8 },
        }}
      />
    </div>
  );
};

export default CodeEditor;