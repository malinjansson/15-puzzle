import { useState } from "react";
import { gameBoard } from "../configs/gameBoard"
import { Shuffle } from "./Shuffle";
import { Brick } from "./Brick";


export const Puzzle = () => {
    const rows = gameBoard.rows;
    const columns = gameBoard.columns;

    const totalBricks: number = rows * columns;
    const initialBricks: number[] = [...Array.from({ length: totalBricks - 1 }, (_, i) => i + 1), 0];

    const [bricks, setBricks] = useState<number[]>(Shuffle(initialBricks));

    const emptyIndex = bricks.indexOf(0);
    const indexToCoord = (index: number) => ({
     row: Math.floor(index / columns),
     col: index % columns,
   });

    const coordToIndex = (row: number, col: number) => row * columns + col;

    const handleBrickClick = (clickedIndex: number) => {
     if (clickedIndex === emptyIndex) return;

      const emptyPos = indexToCoord(emptyIndex);
      const clickedPos = indexToCoord(clickedIndex);
      const sameRow = emptyPos.row === clickedPos.row;
      const sameCol = emptyPos.col === clickedPos.col;

      if (!sameRow && !sameCol) return;

      const newBricks = [...bricks];
      if (sameRow) {
       const row = emptyPos.row;
       const startCol = Math.min(emptyPos.col, clickedPos.col);
       const endCol = Math.max(emptyPos.col, clickedPos.col);

        if (clickedPos.col < emptyPos.col) {
         for (let col = emptyPos.col; col > startCol; col--) {
            newBricks[coordToIndex(row, col)] = newBricks[coordToIndex(row, col - 1)];
         }
         newBricks[coordToIndex(row, startCol)] = 0;
       } else {
         for (let col = emptyPos.col; col < endCol; col++) {
            newBricks[coordToIndex(row, col)] = newBricks[coordToIndex(row, col + 1)];
         }
         newBricks[coordToIndex(row, endCol)] = 0;
       }
     } else if (sameCol) {
       const col = emptyPos.col;
       const startRow = Math.min(emptyPos.row, clickedPos.row);
       const endRow = Math.max(emptyPos.row, clickedPos.row);

        if (clickedPos.row < emptyPos.row) {
         for (let row = emptyPos.row; row > startRow; row--) {
            newBricks[coordToIndex(row, col)] = newBricks[coordToIndex(row - 1, col)];
         }
         newBricks[coordToIndex(startRow, col)] = 0;
       } else {
         for (let row = emptyPos.row; row < endRow; row++) {
           newBricks[coordToIndex(row, col)] = newBricks[coordToIndex(row + 1, col)];
         }
         newBricks[coordToIndex(endRow, col)] = 0;
       }
     }
      setBricks(newBricks);
   };

    const shuffleBricks = () => {
     setBricks(Shuffle(initialBricks));
   };

   return (
    <>
    <div className="game-container">
        <div className="game-board"
            style={{
              display: "grid",
              gridTemplateColumns: `repeat(${columns}, 50px)`,
            }}
        >
        {bricks.map((value, index) => (
          <Brick 
          key={index} 
          value={value} 
          index={index} 
          handleBrickClick={handleBrickClick}
          />
        ))}
      </div>
    </div>
    <button onClick={shuffleBricks}>Shuffle</button>
    </>
  );
};
