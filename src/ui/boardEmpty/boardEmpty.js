import "./style.css";

const BoardEmpty = ({ children }) => {
  return (
    <div className="board-empty-wrapper hide">
      <div className="empty-board-text">{children}</div>
    </div>
  );
};

export default BoardEmpty;
