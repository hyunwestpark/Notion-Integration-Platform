import React from "react";

function Select({ label, options, value, onChange }) {
  return (
    <div className="flex justify-between mb-1">
      <label className="font-medium block text-gray-700">{label}</label>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="text-right focus:outline-none focus:none text-pink-500"
      >
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
}

export default Select;
