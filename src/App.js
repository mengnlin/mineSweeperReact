import React from "react";
import "./App.css";
import Board from "./Board";

function App() {
  return (
    <div className="App">
      {/* <header className="App-header">MineSweeper</header> */}
      <Board size={15} />
    </div>
  );
}

export default App;
