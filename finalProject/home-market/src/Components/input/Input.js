import React from "react";
import PropTypes from "prop-types";
import "./Input.scss";

const InputCustomized = ({id, value, onChange, name, type, borderColor, placeholder, maxLength}) => {
  return (
    <input id={id} value={value} className={"InputCustomized borderColor--" + borderColor} onChange={onChange} name={name} type={type} placeholder={placeholder} maxLength={maxLength}/>
  );
}

InputCustomized.propTypes = {
  id: PropTypes.string,
  value: PropTypes.string,
  onChange: PropTypes.func,
  type: PropTypes.string
};

InputCustomized.defaultValues = {
  onChange: () => {},
  name: "",
  type: "",
  borderColor: "black",
  placeholder: "",
}

export default InputCustomized;