import React from "react";
import "./game.css";
import Board from "./Board";
import ControlBar from "./ControlBar";

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
    const mineHash = {
      Easy: 0.1,
      Medium: 0.2,
      Hard: 0.3
    };
    const gridSize = {
      Easy: 10,
      Medium: 20,
      Hard: 30
    };
    this.setState({
      gridSize: gridSize[event.target.value],
      mineProbability: mineHash[event.target.value]
    });
    console.log(this.state, this.state.gridSize);
    event.preventDefault();
  }
  render() {
    return (
      <div className="game">
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
