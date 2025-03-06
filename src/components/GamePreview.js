import React from 'react';

const GamePreview = ({ gameCode }) => {
  if (!gameCode) return null;

  return (
    <div className="game-preview">
      <h3 className="preview-title">Game Preview</h3>
      <div className="preview-container">
        <div className="iframe-container">
          <iframe
            className="game-iframe"
            srcDoc={gameCode}
            title="Game Preview"
            sandbox="allow-scripts"
          />
        </div>
      </div>
    </div>
  );
};

export default GamePreview;