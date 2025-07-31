function Tile({ className, value, onClick, playerTurn }) {

  //we recieved the player turn through props
  let hoverClass = null;

  //to add the hover effect, before updating we have to make sure the space is free
  if (value == null && playerTurn != null) {
    hoverClass = `${playerTurn.toLowerCase()}-hover `; //then we can dynamically update the hover affect
  }

  return (
    <div onClick={onClick} className={`tile ${className} ${hoverClass}`}>
      {value}
    </div>
  );
}

export default Tile;
