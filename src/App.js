import { useState } from "react";
import "./App.css";
import HeaderMenu from "./components/headerMenu";
import MainBlock from "./pages/mainBlock";
import ShopingCart from "./pages/shopingCard";
import HistoryBlock from "./pages/historyBlock";
import ModalWindow from "./ui/modalWindow";
import ProductCard from "./ui/productCard/productCard";
import { useSelector } from "react-redux";
import classNames from "classnames";
import CouponsBlock from "./pages/couponsBlock";

function App() {
  const darkMode = useSelector((state) => state.darkMode.darkMode);
  const [navigation, setNavigation] = useState("shop");

  const globalWrapperStyle = classNames("global-wrapper", { dark: darkMode });

  // for modal pop-up

  const [productInfo, setProductInfo] = useState(false);

  console.log(navigation);

  return (
    <div className={globalWrapperStyle}>
      <div className="width-wrapper">
        <HeaderMenu setNavigation={setNavigation} />

        {navigation === "shop" ? <MainBlock setProductInfo={setProductInfo} /> : null}
        {navigation === "shopingCard" ? <ShopingCart /> : null}
        {navigation === "history" ? <HistoryBlock /> : null}
        {navigation === "coupons" ? <CouponsBlock /> : null}

        {productInfo && (
          <ModalWindow action={setProductInfo}>
            <ProductCard product={productInfo} modal={true} />
          </ModalWindow>
        )}
      </div>
    </div>
  );
}

export default App;
