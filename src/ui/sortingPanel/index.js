import classNames from "classnames";
import "./style.css";

const SortingPanel = ({ setSortCriteria, sortCriteria }) => {
  return (
    <div className="panel-wrapper">
      <div className="sort-title">Sort by:</div>
      <div
        className={classNames("sort-by-name", { active: sortCriteria === "product_name" })}
        onClick={() => setSortCriteria("product_name")}
      >
        Name
      </div>
      <div
        className={classNames("sort-by-price", { active: sortCriteria === "price" })}
        onClick={() => setSortCriteria("price")}
      >
        Price
      </div>
    </div>
  );
};

export default SortingPanel;
