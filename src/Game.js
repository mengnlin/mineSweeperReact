import React from "react";
import "./game.css";
import Board from "./Board";
import ControlBar from "./ControlBar";

const mineHash = {
  Easy: 0.1,
  Medium: 0.1,
  Hard: 0.1
};
const gridSize = {
  Easy: 10,
  Medium: 20,
  Hard: 30
};
class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      boardId: 0,
      mineProbability: 0.1,
      gridSize: 10,
      isWin: false
    };
    // this.handleSelection.bind(this);
  }
  changeBoardId() {
    let newId = this.state.boardId + 1;
    this.setState({
      boardId: newId,
      isWin: false
    });
  }

  handleSelection(event) {
    this.setState({
      gridSize: gridSize[event.target.value],
      mineProbability: mineHash[event.target.value]
    });
    this.changeBoardId();
  }
  render() {
    return (
      <div className="game">
        <div className="title">MineSweeper</div>
        <ControlBar
          onClick={() => this.changeBoardId()}
          onChange={e => this.handleSelection(e)}
        />
        <Board
          size={this.state.gridSize}
          key={this.state.boardId}
          mineProbability={this.state.mineProbability}
          onWin={() =>
            this.setState({
              isWin: true
            })
          }
        />
        <div className="winning">{this.state.isWin ? "You Win!" : null}</div>
      </div>
    );
  }
}

export default Game;
