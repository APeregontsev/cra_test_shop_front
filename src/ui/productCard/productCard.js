import "./style.css";
import CustomButton from "../customButton";
import { useSelector, useDispatch } from "react-redux";
import { addShopingCard } from "./../../slices/shopingCard/shopingCard";
import { setFavourites } from "./../../slices/favourites/favourites";
import classNames from "classnames";
import FavButton from "../favouriteButton";

const ProductCard = ({ product, setProductInfo, modal }) => {
  const dispatch = useDispatch();
  const favList = useSelector((state) => state.favourites);

  function modalHandler() {
    if (modal) {
      return;
    }
    setProductInfo(product);
  }

  const isFavourite = favList.includes(product.id);

  const productCardStyle = classNames("product-wrapper", { modal: modal });

  return (
    <div className={productCardStyle}>
      <FavButton active={isFavourite} action={() => dispatch(setFavourites(product.id))} />

      <div className="task_img">
        <img src={`./../../product_img/${product.image}`} alt="product" />
      </div>

      <div className="task-title" onClick={modalHandler}>
        {product.product_name}
      </div>

      {modal && (
        <>
          <div className="in-modal-title">Product description:</div>
          <div className="inner-task-description">{product.description}</div>
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
