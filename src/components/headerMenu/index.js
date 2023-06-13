import "./style.css";
import { useSelector } from "react-redux";

const HeaderMenu = ({ setNavigation }) => {
  const shopingCard = useSelector((state) => state.card.shopingCard);

  let itemsInTheCard = Object.values(shopingCard).reduce((red, item) => {
    return red + item;
  }, 0);

  return (
    <div className="header-menu">
      <div
        className="menu-item "
        onClick={() => {
          setNavigation("shop");
        }}
      >
        Shop
      </div>
      <div
        className="menu-item"
        onClick={() => {
          setNavigation("shopingCard");
        }}
      >
        Shoping Cart <div className="cart-items">( {itemsInTheCard} )</div>
      </div>
      <div
        className="menu-item"
        onClick={() => {
          setNavigation("history");
        }}
      >
        History
      </div>
      <div
        className="menu-item"
        onClick={() => {
          setNavigation("coupons");
        }}
      >
        Coupons
      </div>
    </div>
  );
};

export default HeaderMenu;
