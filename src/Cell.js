import React from "react";

function Cell({ isMine, isRevealed, count }) {
  let value = "isNotRevealed";
  if (isRevealed) {
    if (isMine) {
      value = "💣";
    } else if (count > 0) {
      value = count + "";
    }
  }
  return <div style={{ height: "10px" }}>{value}</div>;
}

export default Cell;
