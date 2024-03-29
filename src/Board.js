import React from "react";
import Cell from "./Cell.js";
import "./board-style.css";
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
function randomFillMines(size, probability) {
  let matrix = Array.from({ length: size }).map(() =>
    Array.from({ length: size }).map(() => ({
      isMine: false,
      isRevealed: false,
      count: 0,
      hadFlag: false
    }))
  );
  for (let row = 0; row < size; row++) {
    for (let col = 0; col < size; col++) {
      if (Math.random() <= probability) {
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
      board: randomFillMines(props.size, props.mineProbability),
      gameover: false
    };
  }

  handleClick(row, col, e) {
    let boardArray = this.state.board.map(row => row.map(ele => ele));
    if (!boardArray[row][col].isMine) {
      this.expandClick(boardArray, row, col);
      if (this.checkWinning(boardArray)) {
        this.props.onWin();
      }
    } else {
      this.setState({ gameover: true });
      this.gameOver(boardArray);
    }
    this.setState({ board: boardArray });
  }

  handleContextMenu(row, col, e) {
    let boardArray = this.state.board.map(row => row.map(ele => ele));
    if (!boardArray[row][col].hasFlag) {
      boardArray[row][col] = {
        isMine: boardArray[row][col].isMine,
        isRevealed: boardArray[row][col].isRevealed,
        count: boardArray[row][col].count,
        hasFlag: true
      };
    } else {
      boardArray[row][col] = {
        isMine: boardArray[row][col].isMine,
        isRevealed: boardArray[row][col].isRevealed,
        count: boardArray[row][col].count,
        hasFlag: false
      };
    }
    this.setState({ board: boardArray });
    e.preventDefault();
  }
  checkWinning(board) {
    let size = board.length;
    for (let row = 0; row < size; row++) {
      for (let col = 0; col < size; col++) {
        if (!board[row][col].isRevealed && !board[row][col].isMine) {
          return false;
        }
      }
    }
    return true;
  }

  gameOver(board) {
    let size = board.length;
    for (let row = 0; row < size; row++) {
      for (let col = 0; col < size; col++) {
        board[row][col] = {
          isMine: board[row][col].isMine,
          isRevealed: true,
          count: board[row][col].count,
          hasFlag: board[row][col].hasFlag
        };
      }
    }
  }
  expandClick(matrix, row, col) {
    let size = matrix.length;
    let queue = [[row, col]];
    let inqueue = new Set();
    inqueue.add([row, col] + "");
    let processingIdx = 0;
    while (processingIdx < queue.length) {
      let currentProcessing = queue[processingIdx];
      let currentRow = currentProcessing[0];
      let currentCol = currentProcessing[1];
      if (matrix[currentRow][currentCol].count === 0) {
        addNeighbor(currentRow - 1, currentCol);
        addNeighbor(currentRow + 1, currentCol);
        addNeighbor(currentRow, currentCol + 1);
        addNeighbor(currentRow, currentCol - 1);
      }
      matrix[currentRow][currentCol] = {
        isMine: matrix[currentRow][currentCol].isMine,
        isRevealed: true,
        count: matrix[currentRow][currentCol].count,
        hasFlag: matrix[currentRow][currentCol].hasFlag
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
              onClick={e => this.handleClick(rowIdx, colIdx, e)}
              key={colIdx}
              hasFlag={ele.hasFlag}
              onContextMenu={e => this.handleContextMenu(rowIdx, colIdx, e)}
            />
          ))}
        </div>
      );
    });
    return (
      <div className="board-outer-container">
        <div className="board-inner-container">{boardArray}</div>
        {this.state.gameover ? (
          <div className="game-over">Game Over!</div>
        ) : null}
      </div>
    );
  }
}

export default Board;
