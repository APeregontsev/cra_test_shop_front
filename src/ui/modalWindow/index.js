import "./style.css";

const ModalWindow = ({ children, action }) => {
  return (
    <div className="modal-wrapper" onClick={() => action(false)}>
      <div className="inner-modal" onClick={(event) => event.stopPropagation()}>
        {children}
      </div>
    </div>
  );
};

export default ModalWindow;
