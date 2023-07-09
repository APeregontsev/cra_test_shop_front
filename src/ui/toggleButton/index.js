import "./style.css";

const ToggleButton = ({ children, action }) => {
  return (
    <>
      <input className="checkbox-toggle" type="checkbox" id="checkbox-toggle" onChange={action} />
      <label htmlFor="checkbox-toggle">{children}</label>
    </>
  );
};

export default ToggleButton;
