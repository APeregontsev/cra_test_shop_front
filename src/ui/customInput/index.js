import { useState } from "react";
import "./style.css";
import classNames from "classnames";

const CustomInput = ({ children, setInputsData, name, state }) => {
  const [inputValue, setInputValue] = useState(null);

  return (
    <div className="add-task-block-wrapper">
      <div className="inner-modal-title">{children}</div>
      <input
        type="text"
        className={classNames("input-text", { empty: !inputValue })}
        name={name}
        placeholder={`Enter your ${children}`}
        onChange={(e) => {
          let value = e.target.value;
          setInputValue(e.target.value);
          let name = e.target.getAttribute("name");

          let newState = { ...state };
          newState[name] = value;

          setInputsData((state) => {
            return { ...newState };
          });
        }}
      />
    </div>
  );
};

export default CustomInput;
