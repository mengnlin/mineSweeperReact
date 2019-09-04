import React from "react";
import "./cell-style.css";
function Cell({ isMine, isRevealed, count, onClick, hasFlag, onContextMenu }) {
  let value = " ";
  if (isRevealed) {
    if (isMine) {
      value = "💣";
    } else if (count > 0) {
      value = count + "";
    }
  }
  if (hasFlag) {
    value = "🚩";
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
