import "./style.css";
import CustomInput from "../../ui/customInput";
import ShopingCard from "../../ui/shopingCard";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { useFetching } from "../../useFetching";
import BoardEmpty from "../../ui/boardEmpty/boardEmpty";
import Loading from "../../ui/loader";
import { resetShopingCard } from "./../../slices/shopingCard/shopingCard";
import { serverAddress } from "../../serverAddress";
import CustomButton from "../../ui/customButton";

const ShopingCart = () => {
  const dispatch = useDispatch();
  const shopingCard = useSelector((state) => state.card.shopingCard);

  const [productsInCard, setProductsInCard] = useState([]);
  const [inputsData, setInputsData] = useState({});
  const [orderNumber, setOrderNumber] = useState(null);
  const [couponPasted, setCouponPasted] = useState(null);
  const [couponObtained, setCouponObtained] = useState(null);

  const [fetchProductsCard, isLoading, error] = useFetching(async () => {
    const response = await fetch(`${serverAddress}productsinthecard`, {
      method: "POST",
      body: JSON.stringify({ key: Object.keys(shopingCard) }),
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });

    const data = await response.json();
    setProductsInCard(data);
  });

  const [fetchCoupon, isLoadingCoupon, errorCoupon] = useFetching(async () => {
    console.log("SSSSSSSSSSSSSSSSSSSSStart fetching COUPON");
    const response = await fetch(`${serverAddress}coupons`, {
      method: "POST",
      body: JSON.stringify({ coupon: couponPasted }),
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });

    const data = await response.json();
    if (data[0]["coupon_value"]) {
      setCouponObtained(data[0]["coupon_value"]);
    } else {
      setCouponObtained("error");
    }
  });

  const [saveOrderInDB, isLoading3, error3] = useFetching(async () => {
    const response = await fetch(`${serverAddress}finishorder`, {
      method: "POST",
      body: JSON.stringify({ ...inputsData, key: { ...shopingCard } }),
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });

    const data = await response.json();
    dispatch(resetShopingCard());
    setOrderNumber(data);
  });

  const isRegistrationFields =
    inputsData.address && inputsData.email && inputsData.name && inputsData.phone;

  function submitHandler() {
    if (isRegistrationFields) {
      saveOrderInDB();
      setInputsData({});
    }
  }

  function applyCouponHandler() {
    if (couponPasted) {
      fetchCoupon();
    } else {
      navigator.clipboard.readText().then((text) => setCouponPasted(text));
    }
  }

  useEffect(() => {
    if (Object.keys(shopingCard).length) {
      console.log(Object.keys(shopingCard).length);
      fetchProductsCard();
    }
  }, []);

  let totalPrice = 0;

  const calcPrice = Object.keys(shopingCard).map((item) => {
    const details = productsInCard[item];
    return details && (totalPrice += productsInCard[item].price * shopingCard[item]);
  });

  let finalPrice =
    couponObtained && couponObtained != "error"
      ? totalPrice - totalPrice * couponObtained
      : totalPrice;

  return (
    <div className="shopping-card-wrapper">
      <div className="card-wrapper">
        <div className="customer-data-wrapper">
          <CustomInput name="name" setInputsData={setInputsData} state={inputsData}>
            Name:
          </CustomInput>
          <CustomInput name="email" setInputsData={setInputsData} state={inputsData}>
            Email:
          </CustomInput>
          <CustomInput name="phone" setInputsData={setInputsData} state={inputsData}>
            Phone:
          </CustomInput>
          <CustomInput name="address" setInputsData={setInputsData} state={inputsData}>
            Address:
          </CustomInput>
        </div>

        <div className="products-data-wrapper">
          {isLoading && <Loading />}

          {Object.keys(shopingCard).length == 0 && !orderNumber && (
            <BoardEmpty>Your shopping cart is empty</BoardEmpty>
          )}
          {orderNumber && <BoardEmpty>Your order is # {orderNumber}</BoardEmpty>}
          {Object.keys(shopingCard).map((item) => {
            const details = productsInCard[item];
            return (
              details && (
                <ShopingCard amount={shopingCard[item]} details={productsInCard[item]} key={item} />
              )
            );
          })}
        </div>
      </div>

      <div className="total-wrapper">
        <div className="add-task-block-wrapper">
          <div className="inner-modal-title">Coupon:</div>
          <div className="coupon-input-wrapper">
            <input
              value={couponPasted}
              type="text"
              className="input-text "
              placeholder="Enter coupon number"
              onInput={(e) => {
                setCouponPasted(e.target.value);
                setCouponObtained(null);
              }}
            />

            <CustomButton action={() => applyCouponHandler()}>
              {couponPasted ? "Apply" : "Paste"}
            </CustomButton>

            {couponObtained == "error" ? <div className="error_coupon">Invalid coupon!</div> : null}
            {couponObtained && couponObtained != "error" ? (
              <div className="success_coupon">Coupon applied!</div>
            ) : null}
          </div>
        </div>
        <div className="submit-wrapper">
          <div className="total-text">Total price:</div>
          <div className="total-price">{finalPrice}</div>

          <CustomButton action={() => submitHandler()} disabled={!isRegistrationFields}>
            Submit
          </CustomButton>
        </div>
      </div>
    </div>
  );
};

export default ShopingCart;
