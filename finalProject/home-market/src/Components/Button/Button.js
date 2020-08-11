import React from "react";
import PropTypes from "prop-types";
import "./Button.scss";

const ButtonCustomized = ({
  typeButton,
  onClick,
  children,
  className,
  type,
}) => {
  return (
    <button
      disabled={typeButton==="disabled"}
      className={`ButtonCustomized ButtonCustomized--${typeButton} ${className}`}
      onClick={onClick}
      type={type}
    >
      {children}
    </button>
  );
};

ButtonCustomized.propTypes = {
  onClick: PropTypes.func,
  typeButton: PropTypes.string,
  className: PropTypes.string,
  type: PropTypes.string,
};

ButtonCustomized.defaultProps = {
  onClick: () => {},
  typeButton: "primary",
  className: "",
  type: "",
};

export default ButtonCustomized;
