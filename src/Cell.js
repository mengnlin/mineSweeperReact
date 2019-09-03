import React from "react";
import "./cell.css";
function Cell({ isMine, isRevealed, count, onClick }) {
  let value = " ";
  if (isRevealed) {
    if (isMine) {
      value = "💣";
    } else if (count > 0) {
      value = count + "";
    }
  }

  let styleClass = isRevealed ? "cell revealed-cell" : "cell hidden-cell";
  return (
    <div className={styleClass} onClick={onClick}>
      {value}
    </div>
  );
}

export default Cell;
