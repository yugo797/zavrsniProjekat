import React from "react";

const ErrorMsg = ({ message }) => {
  return (
    <div className="error">
      <p>{message}</p>
    </div>
  );
};

export default ErrorMsg;