import React from "react";

const Toast = ({ err, warn, success, text }) => {
  return (
    <div
      className={` py-2 px-4  rounded-md  mt-4  ${err ? "bg-red-500" : ""} ${
        warn ? "bg-yellow-300" : " "
      } 
  ${success ? "bg-green-400" : ""}`}
    >
      <p>{text}</p>
    </div>
  );
};

export default Toast;
