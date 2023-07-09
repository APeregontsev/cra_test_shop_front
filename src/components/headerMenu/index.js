import "./style.css";
import FavButton from "../../ui/favouriteButton";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { setInitialFavList } from "../../slices/favourites/favourites";
import { useFetching } from "../../useFetching";
import { serverAddress } from "../../serverAddress";

const HeaderMenu = ({ setNavigation }) => {
  const [onlineUsers, setonlineUsers] = useState(0);
  const shopingCard = useSelector((state) => state.card.shopingCard);
  const favList = useSelector((state) => state.favourites);
  const dispatch = useDispatch();

  const storageKey = "favList";

  useEffect(() => {
    const localStorageData = JSON.parse(localStorage.getItem(storageKey));
    if (localStorageData) {
      dispatch(setInitialFavList(localStorageData));
    }
  }, []);

  let itemsInTheCard = Object.values(shopingCard).reduce((red, item) => {
    return red + item;
  }, 0);

  let countFavourites = favList.length;

  const [fetchOnlineUsers, isLoading, error] = useFetching(async () => {
    const response = await fetch(`${serverAddress}online`, {
      credentials: "include",
    });

    const data = await response.json();
    setonlineUsers(data);
  });

  useEffect(() => {
    setTimeout(() => {
      fetchOnlineUsers();
    }, 500);
  }, []);

  return (
    <div className="header-menu">
      <div className="menu-wrapper">
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

      <div className="submenu-wrapper">
        <FavButton
          type={"ico"}
          count={countFavourites}
          action={() => {
            setNavigation("favorites");
          }}
        />
        <div className="online-wrapper">users online: {onlineUsers}</div>
      </div>
    </div>
  );
};

export default HeaderMenu;
