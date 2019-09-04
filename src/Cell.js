import React from "react";
import "./cell.css";
function Cell({ isMine, isRevealed, count, onClick, hasFlag, onContextMenu }) {
  let value = " ";
  if (isRevealed) {
    if (isMine) {
      value = "💣";
    } else if (count > 0) {
      value = count + "";
    }
  }
  //   console.log(hasFlag);
  if (hasFlag) {
    value = "🚩";
    // console.log("here");
  }
  let styleClass = isRevealed ? "cell revealed-cell" : "cell hidden-cell";
  return (
    <div
      className={styleClass}
      onClick={e => onClick(e)}
      onContextMenu={e => onContextMenu(e)}
    >
      {value}
    </div>
  );
}

export default Cell;
