import "./style.css";

const ConfirmPlate = ({ children, subject, actionCancel, actionConfirm }) => {
  return (
    <div className="modal-content">
      <div className="add-task-title red">{subject}</div>

      <div className="inner-task-description">{children}</div>

      <div className="buttons-wrapper">
        <button className="general-btn delete" onClick={() => actionConfirm()}>
          Delete
        </button>
        <button className="general-btn cancel" onClick={() => actionCancel(false)}>
          Cancel
        </button>
      </div>
    </div>
  );
};

export default ConfirmPlate;
