import classNames from "classnames";
import "./style.css";
import BoardItem from "../../ui/boardItem";
import DarkModeSwitch from "../../ui/darkModeSwitch";
import { useDispatch, useSelector } from "react-redux";
import { setSidebar } from "./../../slices/hideSidebar/hideSidebar";
import { setCategories } from "./../../slices/categories/categories";
import { useEffect } from "react";
import Loading from "../../ui/loader";
import { useFetching } from "../../useFetching";
import { selectCategory } from "../../slices/selectedCategory/category";
import { serverAddress } from "../../serverAddress";

const Sidebar = () => {
  const dispatch = useDispatch();
  const sidebarVisibility = useSelector((state) => state.sidebar.hideSidebar);
  const sidebarStyle = classNames("sidebar-wrapper", { hide: sidebarVisibility });
  const categories = useSelector((state) => state.categories.categories);
  const selectedCategory = useSelector((state) => state.selectedCategory.category);

  const [fetchCategories, isLoading, error] = useFetching(async () => {
    const response = await fetch(`${serverAddress}categories`);
    const data = await response.json();
    dispatch(setCategories(data));
  });

  useEffect(() => {
    if (!categories.length) fetchCategories();
  }, []);

  return (
    <div className={sidebarStyle}>
      <div className="sidebar">
        <div className="sidebar-body">
          <div className="body-header">
            <div className="body-header-text">Shops:</div>
          </div>
          <div className="boards-main">
            <div className="boards-items-wrapper">
              {categories.map((category) => {
                return (
                  <BoardItem
                    key={category.id}
                    category={category}
                    action={() => dispatch(selectCategory(category.id))}
                  >
                    {category.category_name}
                  </BoardItem>
                );
              })}
            </div>
          </div>
          {isLoading && <Loading />}
        </div>

        <div className="sidebar-footer">
          <DarkModeSwitch />

          <BoardItem type="hide" action={() => dispatch(setSidebar(!sidebarVisibility))}>
            Hide Sidebar
          </BoardItem>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
