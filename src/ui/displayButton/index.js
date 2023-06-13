import "./style.css";

const DisplayButton = ({ children, action }) => {
  return (
    <div className="show-button " onClick={action}>
      <img src="./../../img/show_icon.svg" alt="show_sidebar" />
    </div>
  );
};

export default DisplayButton;
