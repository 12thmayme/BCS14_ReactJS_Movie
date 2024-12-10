import React from "react";

const Modal = ({ isVisible, title, content, actionText, onClose, onAction }) => {
  if (!isVisible) return null;

  return (
    <div
      className="modal-overlay"
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 1000,
      }}
    >
      <div
        className="modal-container"
        style={{
          backgroundColor: "white",
          borderRadius: "8px",
          padding: "20px",
          width: "400px",
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
          color: "black",
        }}
      >
        <h3 style={{ margin: "0 0 20px" }}>{title}</h3>
        <p>{content}</p>
        <div style={{ textAlign: "right" }}>
          {onAction && (
            <button
              className="btn btn-primary"
              style={{
                padding: "10px 20px",
                borderRadius: "4px",
                border: "none",
                backgroundColor: "#d96c2b",
                color: "#fff",
                marginRight: "10px",
                cursor: "pointer",
              }}
              onClick={onAction}
            >
              {actionText}
            </button>
          )}
          <button
            className="btn btn-secondary"
            style={{
              padding: "10px 20px",
              borderRadius: "4px",
              border: "none",
              backgroundColor: "#555",
              color: "#fff",
              cursor: "pointer",
            }}
            onClick={onClose}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
