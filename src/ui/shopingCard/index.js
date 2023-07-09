import "./style.css";

import { useDispatch, useSelector } from "react-redux";
import { addShopingCard, removeShopingCard } from "./../../slices/shopingCard/shopingCard";
import CustomButton from "../customButton";
import ModalWindow from "../modalWindow";
import ConfirmPlate from "../confirmPlate";
import { useState } from "react";

const ShopingCard = ({ amount, details }) => {
  const dispatch = useDispatch();
  const productAmount = useSelector((state) => state.card.shopingCard);

  const [showConfirm, setShowConfirm] = useState(false);

  function minusHandler() {
    if (productAmount[details.id] === 1) {
      setShowConfirm(true);
    } else {
      dispatch(removeShopingCard(details.id));
    }
  }

  function confirmDeteting() {
    dispatch(removeShopingCard(details.id));
    setShowConfirm(false);
  }

  return (
    <div className="product-wrapper card">
      {showConfirm && (
        <ModalWindow action={setShowConfirm}>
          <ConfirmPlate
            subject={"Delete this product?"}
            actionCancel={setShowConfirm}
            actionConfirm={confirmDeteting}
          >
            Are you sure you want to delete <span className="highligt">{details.product_name}</span>{" "}
            from the card?
          </ConfirmPlate>
        </ModalWindow>
      )}

      <div className="task_img">
        <img src={`./../../product_img/${details.image}`} alt={details.product_name} />
      </div>
      <div className="task-title">{details.product_name}</div>
      <div className="task-body ">
        <div className="completed-subtasks">Price: {details.price * amount} UAH</div>
        <div className="plus-minus-btn">
          <CustomButton action={minusHandler}>-</CustomButton>

          <div className="completed-subtasks number">{amount}</div>
          <CustomButton
            action={() => {
              dispatch(addShopingCard(details.id));
            }}
          >
            +
          </CustomButton>
        </div>
      </div>
    </div>
  );
};

export default ShopingCard;
