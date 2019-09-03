import React from "react";
import Cell from "./Cell";
import "./board.css";
function setNearMinesCount(matrix) {
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
      isRevealed: false,
      count: 0
    }))
  );
  for (let row = 0; row < size; row++) {
    for (let col = 0; col < size; col++) {
      if (Math.random() <= 0.3) {
        matrix[row][col].isMine = true;
      }
    }
  }
  setNearMinesCount(matrix);
  return matrix;
}
class Board extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      board: randomFillMines(props.size)
    };
  }

  handleClick(row, col) {
    let boardArray = this.state.board.map(row => row.map(ele => ele));
    if (!boardArray[row][col].isMine) {
      this.expandClick(boardArray, row, col);
    } else {
      this.gameOver(boardArray);
    }
    this.setState({ board: boardArray });
  }
  gameOver(board) {
    let size = board.length;
    for (let row = 0; row < size; row++) {
      for (let col = 0; col < size; col++) {
        board[row][col] = {
          isMine: board[row][col].isMine,
          isRevealed: true,
          count: board[row][col].count
        };
      }
    }
  }
  expandClick(matrix, row, col) {
    // modify the matrix
    let size = matrix.length;
    let queue = [[row, col]];
    let inqueue = new Set();
    inqueue.add([row, col] + "");
    let processingIdx = 0;
    while (processingIdx < queue.length) {
      let currentProcessing = queue[processingIdx];
      let currentRow = currentProcessing[0];
      let currentCol = currentProcessing[1];
      addNeighbor(currentRow - 1, currentCol);
      addNeighbor(currentRow + 1, currentCol);
      addNeighbor(currentRow, currentCol + 1);
      addNeighbor(currentRow, currentCol - 1);
      matrix[currentRow][currentCol] = {
        isMine: matrix[currentRow][currentCol].isMine,
        isRevealed: true,
        count: matrix[currentRow][currentCol].count
      };
      processingIdx++;
    }

    function addNeighbor(row, col) {
      if (
        row < 0 ||
        row >= size ||
        col < 0 ||
        col >= size ||
        inqueue.has([row, col] + "") ||
        matrix[row][col].isMine
      ) {
        return;
      }
      queue.push([row, col]);
      inqueue.add([row, col] + "");
    }
  }

  render() {
    let boardArray = this.state.board.map((row, rowIdx) => {
      return (
        <div className="cellRow" key={rowIdx}>
          {row.map((ele, colIdx) => (
            <Cell
              isMine={ele.isMine}
              isRevealed={ele.isRevealed}
              count={ele.count}
              onClick={() => this.handleClick(rowIdx, colIdx)}
              key={colIdx}
            />
          ))}
        </div>
      );
    });
    return (
      <div className="board-outer-container">
        <div className="board-inner-container">{boardArray}</div>
      </div>
    );
  }
}

export default Board;
