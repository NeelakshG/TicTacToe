import { useState, useEffect } from "react";
import Board from "./Board";

function TicTacToe() {
  const [tiles, setTiles] = useState(Array(9).fill(null));
  const [playerTurn, setPlayerTurn] = useState("X");
  const [strikeClass, setStrikeClass] = useState("");

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

  function checkWinner(tiles, setStrikeClass) {
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
      }
    }
  }

  //this method handles each click of the tiles
  const handleTitleClick = (e) => {
    const newTiles = [...tiles]; // make a new array of tiles that saves the state of the tiles prior,
    newTiles[e] = playerTurn; //set the value of the tile at the index it was clciked into whatever the value of player tile is
    setTiles(newTiles); //update the tiles

    playerTurn === "X" ? setPlayerTurn(PLAYER_O) : setPlayerTurn(PLAYER_X); //update the player turn
  };

  useEffect(() => {
    checkWinner(tiles, setStrikeClass);
  }, [tiles]);

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
    </div>
  );
}

export default TicTacToe;
