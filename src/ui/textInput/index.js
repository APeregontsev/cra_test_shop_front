import "./style.css";

const TextInput = ({ children, ...rest }) => {
  return (
    <div class="add-task-block-wrapper">
      <div class="inner-modal-title">{children}</div>
      <input type="text" class="input-text " {...rest} />
    </div>
  );
};

export default CustomButton;
