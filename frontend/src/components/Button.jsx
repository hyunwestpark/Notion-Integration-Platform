import React from "react";

const Button = ({ content, classname, onClick }) => {
  return (
    <button content={content} className={`${classname}`} onClick={onClick}>
      {content}
    </button>
  );
};

export default Button;
