import "./style.css";

const CustomButton = ({ children, action, disabled }) => {
  return (
    <button className="general-btn add" onClick={action} disabled={disabled}>
      {children}
    </button>
  );
};

export default CustomButton;
