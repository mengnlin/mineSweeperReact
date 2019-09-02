import React from "react";

function randomFillMines(size) {
  let matrix = Array.from({ length: size }).map(() =>
    new Array(size).map(() => ({ mine: false, isReveal: false }))
  );
  for (let row = 0; row < size; row++) {
    for (let col = 0; col < size; col++) {
      if (Math.random() <= 0.3) {
        matrix[row][col].mine = true;
      }
    }
  }
  return matrix;
}
class Board extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      board: randomFillMines(props.size)
    };
  }
}
