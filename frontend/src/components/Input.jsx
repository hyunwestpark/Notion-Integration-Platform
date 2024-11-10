import React from "react";

const Input = ({
  name,
  value,
  type,
  label,
  onChange,
  placeholder,
  classname,
}) => {
  return (
    <div>
      {label && (
        <label>
          {label}
          <input
            name={name}
            value={value}
            type={type}
            onChange={onChange}
            placeholder={placeholder}
            className={`${classname}`}
          ></input>
        </label>
      )}
    </div>
  );
};

export default Input;
