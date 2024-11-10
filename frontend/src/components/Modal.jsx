import React from "react";

function Modal({ isOpen, onClose, children, title, message }) {
  if (!isOpen) return null;

  return (
    <div className="fixed -inset-4 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white rounded-lg shadow-lg p-8 max-w-sm w-full">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-bold">{title}</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 font-bold"
          >
            &times;
          </button>
        </div>
        <p>{message}</p>
        <button
          onClick={onClose}
          className="bg-pink-400 hover:bg-pink-500 text-white font-bold py-2 px-4 rounded mt-4 w-full"
        >
          닫기
        </button>
      </div>
    </div>
  );
}

export default Modal;
