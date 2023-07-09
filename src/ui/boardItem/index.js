import "./style.css";
import { useSelector } from "react-redux";
import classNames from "classnames";

const BoardItem = ({ children, type, action, category }) => {
  const selectedCategory = useSelector((state) => state.selectedCategory.category);

  const isActive =
    category && category.id != undefined && selectedCategory && category.id === selectedCategory;

  const boardItemStyle = classNames("board-item", {
    "hide-sidebar": type === "hide",
    active: isActive,
  });

  return (
    <div className={boardItemStyle} onClick={action}>
      <div className="board-item-icon">
        {!type ? (
          <img src={`./../../category_logo/${category.image}`} alt={category.category_name} />
        ) : null}
      </div>
      <div className="board-item-name">{children}</div>
    </div>
  );
};

export default BoardItem;
