import GameState from "./GameState";

function GameOver({ gameState }) {
  switch (gameState) {
    case GameState.inProgress:
      return <></>;
    case GameState.draw:
      return <div className="game-over"> Draw</div>;
    case GameState.playerXWins:
      return <div className="game-over">X wins</div>;
    case GameState.playerOWins:
      return <div className="game-over">O wins</div>;
    default:
      return <></>;
  }
}

export default GameOver;
