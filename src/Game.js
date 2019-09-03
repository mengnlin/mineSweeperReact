import React from "react";
import "./game.css";
import Board from "./Board";

class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      boardId: 0
    };
  }

  changeBoardId() {
    let newId = this.state.boardId + 1;
    this.setState({
      boardId: newId,
      isWin: false
    });
  }
  render() {
    return (
      <div className="game">
        <button onClick={() => this.changeBoardId()}>Restart</button>
        <Board
          size={15}
          key={this.state.boardId}
          onWin={() =>
            this.setState({
              isWin: true
            })
          }
        />
        {this.state.isWin ? "You Win" : null}
      </div>
    );
  }
}

export default Game;
