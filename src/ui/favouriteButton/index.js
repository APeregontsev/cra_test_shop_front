import "./style.css";
import classNames from "classnames";

const FavButton = ({ action, active, type, count }) => {
  const heartClass = classNames("heart", { active: active }, { ico: type === "ico" });

  return (
    <div className={heartClass} onClick={action} data-count={count}>
      <svg viewBox="40 20 448 448">
        <path
          className="red_svg"
          d="m296 112c-27.675781-.09375-52.921875 15.800781-64.800781 40.800781l-7.199219 14.902344-7.199219-14.902344c-14.550781-30.269531-48.105469-46.445312-80.847656-38.976562s-55.964844 36.59375-55.953125 70.175781c0 82.089844 121.550781 149.878906 144 161.695312 22.441406-11.824218 144-79.695312 144-161.695312-.042969-39.746094-32.253906-71.957031-72-72zm0 0"
        />
      </svg>
    </div>
  );
};

export default FavButton;
