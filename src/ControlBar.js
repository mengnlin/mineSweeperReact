import React from "react";
import "./controlBar.css";

function ControlBar({ onClick, onChange }) {
  return (
    <div className="controlBar-containner">
      <button onClick={() => onClick()} className="controlBar-item">
        Restart
      </button>
      {/* <form> */}
      <select onChange={e => onChange(e)} className="controlBar-item">
        <option value="Easy">Easy</option>
        <option value="Medium">Medium</option>
        <option value="Hard">Hard</option>
      </select>
      {/* <input type="submit" value="Submit" /> */}
      {/* </form> */}
    </div>
  );
}
export default ControlBar;
