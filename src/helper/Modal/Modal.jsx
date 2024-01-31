import React from "react";
import { TiDelete } from "react-icons/ti";


const Modal = ({ isOpen, onClose, children }) => {
  
  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        display: isOpen ? "flex" : "none",
        justifyContent: "center",
        alignItems: "center",
        zIndex: "1",
      }}
    >
      <div
        style={{
          backgroundColor: "white",
          padding: "20px",
          borderRadius: "8px",
          minWidth: "400px",
        }}
      >
        <button
          onClick={onClose}
          style={{
            position: "relative",
            right: "10px",
            cursor: "pointer",
            background: "none",
            border: "none",
          }}
        >
          <TiDelete className="w-[25px]" />
        </button>
        {children}
      </div>
    </div>
  );
};

export default Modal;