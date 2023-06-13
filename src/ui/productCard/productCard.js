import "./style.css";
import CustomButton from "../customButton";
import { useSelector, useDispatch } from "react-redux";
import { addShopingCard } from "./../../slices/shopingCard/shopingCard";
import classNames from "classnames";

const ProductCard = ({ product, setProductInfo, modal }) => {
  const dispatch = useDispatch();
  const shopingCard = useSelector((state) => state.card.shopingCard);

  function modalHandler() {
    if (modal) {
      return;
    }
    setProductInfo(product);
  }

  const productCardStyle = classNames("product-wrapper", { modal: modal });

  return (
    <div className={productCardStyle}>
      <div className="task_img">
        <img src={`./../../product_img/${product.image}`} alt="product" />
      </div>

      <div className="task-title" onClick={modalHandler}>
        {product.product_name}
      </div>

      {modal && (
        <>
          <div class="in-modal-title">Product description:</div>
          <div class="inner-task-description">{product.description}</div>
        </>
      )}

      <div className="task-body">
        <div className="completed-subtasks">{product.price} UAH</div>

        <CustomButton action={() => dispatch(addShopingCard(product.id))}>add to card</CustomButton>
      </div>
    </div>
  );
};

export default ProductCard;
