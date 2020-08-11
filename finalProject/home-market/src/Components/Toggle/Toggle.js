import React from "react";
import "./Toggle.scss";

const Toggle = ({...rest}) => {
  return (
    <label className="switch">
      <input type="checkbox" {...rest}/>
      <span className="slider round"></span>
    </label>
  );
}

export default Toggle;