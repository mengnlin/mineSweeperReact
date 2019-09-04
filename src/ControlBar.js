import React from "react";
import "./control-bar-style.css";

function ControlBar({ onClick, onChange }) {
  return (
    <div className="controlBar-containner">
      <button onClick={() => onClick()} className="controlBar-item">
        Restart
      </button>
      <select onChange={e => onChange(e)} className="controlBar-item">
        <option value="Easy">Easy</option>
        <option value="Medium">Medium</option>
        <option value="Hard">Hard</option>
      </select>
    </div>
  );
}
export default ControlBar;
