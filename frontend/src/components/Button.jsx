import React from "react";

const Button = ({ classname, onClick, type, disabled, style, children }) => {
  return (
    <button
      className={`${classname}`}
      onClick={onClick}
      type={type}
      disabled={disabled}
      style={style}
    >
      {children}
    </button>
  );
};

export default Button;
