import React from "react";

const GameSelection = ({ selectedGames, toggleGameSelection, games }) => {
  return (
    <div className="game-selection">
      <h3 className="">Select Games to Play</h3>
      <div className="game-list">
        {games.map((game) => (
          <div key={game.id} className="game-item">
            <label className="checkbox-container">
              <input
                type="checkbox"
                checked={selectedGames.includes(game.id)}
                onChange={() => toggleGameSelection(game.id)}
              />
              <span className="game-icon">{game.icon}</span>
              <span className="game-name">{game.name}</span>
            </label>
          </div>
        ))}
      </div>
    </div>
  );
};

export default GameSelection;