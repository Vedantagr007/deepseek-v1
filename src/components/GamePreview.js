import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

const GamePreview = ({ gameCode, previewTitle = "Game Preview" }) => {
  const [width, setWidth] = useState(600);
  const fixedHeight = 400;
  const [resizing, setResizing] = useState(false);
  const [lastX, setLastX] = useState(0);

  const handleMouseDown = (e) => {
    setResizing(true);
    setLastX(e.clientX);
    e.preventDefault();
  };

  const handleMouseMove = (e) => {
    if (!resizing) return;
    const dx = e.clientX - lastX;
    setWidth(prev => Math.max(300, prev + dx));
    setLastX(e.clientX);
  };

  const handleMouseUp = () => {
    setResizing(false);
  };

  useEffect(() => {
    if (resizing) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
    } else {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    }
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [resizing]);

  if (!gameCode) return null;

  return (
    <div className="game-preview dark" style={{ ...styles.gamePreview, width}}>
      <h3 className="preview-title" style={styles.previewTitle}>
        <span className="preview-heading dark">{previewTitle}</span>
      </h3>
      <div 
        className="preview-container" 
        style={{ ...styles.previewContainer, height: fixedHeight }}
      >
        <iframe
          className="game-iframe dark"
          srcDoc={gameCode}
          title="Game Preview"
          sandbox="allow-scripts"
          style={styles.iframe}
          scrolling="no"
        />
        <div 
          className="resizer" 
          style={styles.resizer}
          onMouseDown={handleMouseDown}
        />
      </div>
    </div>
  );
};

const styles = {
  gamePreview: {
    border: '1px solid #ccc',
    borderRadius: '8px',
    overflow: 'hidden',
    boxShadow: '0 2px 5px rgba(0,0,0,0.1)',
    margin: '10px auto',
    display: 'flex',
    flexDirection: 'column',
  },
  previewTitle: {
    backgroundColor: '#f7f7f7',
    padding: '10px',
    margin: 0,
    fontSize: '1.2em',
    textAlign: 'center',
  },
  previewContainer: {
    position: 'relative',
    border: '1px solid #ddd',
  },
  iframe: {
    border: 'none',
    width: '100%',
    height: '100%',
    overflow: 'hidden',
  },
  resizer: {
    position: 'absolute',
    top: 0,
    right: 0,
    width: '10px',
    height: '100%',
    cursor: 'ew-resize',
    backgroundColor: 'transparent',
    zIndex: 10,
  },
};

GamePreview.propTypes = {
  gameCode: PropTypes.string.isRequired,
  previewTitle: PropTypes.string,
};

export default GamePreview;