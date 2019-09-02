import React from "react";
import Cell from "./Cell";

function setNearMines(matrix) {
  let size = matrix.length;
  for (let row = 0; row < size; row++) {
    for (let col = 0; col < size; col++) {
      let count = 0;
      for (let theRow = row - 1; theRow <= row + 1; theRow++) {
        for (let theCol = col - 1; theCol <= col + 1; theCol++) {
          if (theRow === row && theCol === col) {
            continue;
          }
          if (theRow < 0 || theRow >= size || theCol < 0 || theCol >= size) {
            continue;
          }
          if (matrix[theRow][theCol].isMine) {
            count++;
          }
        }
      }
      matrix[row][col].count = count;
    }
  }
}
function randomFillMines(size) {
  let matrix = Array.from({ length: size }).map(() =>
    Array.from({ length: size }).map(() => ({
      isMine: false,
      isReveal: false,
      count: 0
    }))
  );
  for (let row = 0; row < size; row++) {
    for (let col = 0; col < size; col++) {
      if (Math.random() <= 0.2) {
        matrix[row][col].isMine = true;
      }
    }
  }
  setNearMines(matrix);
  return matrix;
}
class Board extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      board: randomFillMines(props.size)
    };
  }

  render() {
    let boardArray = this.state.board.map(row => {
      return (
        <div>
          {row.map(ele => (
            <Cell
              isMine={ele.isMine}
              isRevealed={ele.isRevealed}
              count={ele.count}
            />
          ))}
        </div>
      );
    });
    return <div>{boardArray}</div>;
  }
}

export default Board;
