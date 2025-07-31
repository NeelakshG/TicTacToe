import { useState } from "react";
import Board from "./Board";

function TicTacToe() {
  const [tiles, setTiles] = useState(Array(9).fill(null));

  const PLAYER_X = "X";
  const PLAYER_O = "O";

  const [playerTurn, setPlayerTurn] = useState("X");

  //this method handles each click of the tiles
  const handleTitleClick = (e) => {
    const newTiles = [...tiles]; // make a new array of tiles that saves the state of the tiles prior,
    newTiles[e] = playerTurn; //set the value of the tile at the index it was clciked into whatever the value of player tile is
    setTiles(newTiles); //update the tiles

    playerTurn === "X" ? setPlayerTurn(PLAYER_O) : setPlayerTurn(PLAYER_X); //update the player turn
  };
  return (
    <div>
      <h1>Tic Tac Toe</h1>
      <Board
        playerTurn={playerTurn}
        onTileClick={handleTitleClick}
        tiles={tiles}
      ></Board>
      {/* For the board component, we are sending over the method that handles what happens when clicked, and the tiles state  */}
    </div>
  );
}

export default TicTacToe;
