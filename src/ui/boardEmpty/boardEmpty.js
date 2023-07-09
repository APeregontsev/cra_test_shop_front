import "./style.css";
import classNames from "classnames";

const BoardEmpty = ({ children, type }) => {
  const boardEmptyStyle = classNames("board-empty-wrapper", { error: type });

  return (
    <div className={boardEmptyStyle}>
      <div className="empty-board-text">{children}</div>
    </div>
  );
};

export default BoardEmpty;
