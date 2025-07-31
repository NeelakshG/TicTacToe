import { useState, useEffect } from "react";
import Board from "./Board";
import GameOver from "./GameOver";
import GameState from "./GameState.js";
import Reset from "./Reset.jsx";

function TicTacToe() {
  const [tiles, setTiles] = useState(Array(9).fill(null));
  const [playerTurn, setPlayerTurn] = useState("X");
  const [strikeClass, setStrikeClass] = useState("");
  const [gameState, setGameState] = useState(GameState.inProgress);

  const PLAYER_X = "X";
  const PLAYER_O = "O";

  const winningCombinations = [
    //rows
    { combo: [0, 1, 2], strikeClass: "strike-row-1" },
    { combo: [3, 4, 5], strikeClass: "strike-row-2" },
    { combo: [6, 7, 8], strikeClass: "strike-row-3" },

    //rows
    { combo: [0, 3, 6], strikeClass: "strike-column-1" },
    { combo: [1, 4, 7], strikeClass: "strike-column-2" },
    { combo: [2, 5, 8], strikeClass: "strike-column-3" },

    //diagonal
    { combo: [0, 4, 8], strikeClass: "strike-diagonal-1" },
    { combo: [2, 4, 6], strikeClass: "strike-diagonal-2" },
  ];

  function checkWinner(tiles, setStrikeClass, setGameState) {
    //to check for winner, we go through each winningCombination
    for (const { combo, strikeClass } of winningCombinations) {
      //we map the combo array positions into the tileValue position
      const tileValue1 = tiles[combo[0]];
      const tileValue2 = tiles[combo[1]];
      const tileValue3 = tiles[combo[2]];

      //after mapping the combo, if there is a match we can conclude a winner
      if (
        tileValue1 !== null &&
        tileValue1 === tileValue2 &&
        tileValue1 === tileValue3
      ) {
        setStrikeClass(strikeClass);
        if (tileValue1 === PLAYER_X) {
          setGameState(GameState.playerXWins);
        } else {
          setGameState(GameState.playerOWins);
        }
        return;
      }
    }

    const areAllTilesFilled = tiles.every((tile) => tile !== null);

    if (areAllTilesFilled) {
      setGameState(GameState.draw);
    }
  }

  //this method handles each click of the tiles
  const handleTitleClick = (e) => {
    if (gameState !== GameState.inProgress) {
      return;
    }

    if (tiles[e] !== null) {
      return;
    }

    const newTiles = [...tiles]; // make a new array of tiles that saves the state of the tiles prior,
    newTiles[e] = playerTurn; //set the value of the tile at the index it was clciked into whatever the value of player tile is
    setTiles(newTiles); //update the tiles

    playerTurn === "X" ? setPlayerTurn(PLAYER_O) : setPlayerTurn(PLAYER_X); //update the player turn
  };

  useEffect(() => {
    checkWinner(tiles, setStrikeClass, setGameState);
  }, [tiles]);

  const handleReset = () => {
    setGameState(GameState.inProgress);
    setTiles(Array(9).fill(null));
    setPlayerTurn(PLAYER_X);
    setStrikeClass("");
  };

  return (
    <div>
      <h1>Tic Tac Toe</h1>
      <Board
        strikeClass={strikeClass}
        playerTurn={playerTurn}
        onTileClick={handleTitleClick}
        tiles={tiles}
      ></Board>
      {/* For the board component, we are sending over the method that handles what happens when clicked, and the tiles state  */}
      <GameOver gameState={gameState} />
      <Reset gameState={gameState} onReset={handleReset}>
        {" "}
      </Reset>
    </div>
  );
}

export default TicTacToe;
