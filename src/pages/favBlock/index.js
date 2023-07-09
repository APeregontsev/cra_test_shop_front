import "./style.css";

import { useSelector, useDispatch } from "react-redux";
import ProductCard from "../../ui/productCard/productCard";
import BoardEmpty from "../../ui/boardEmpty/boardEmpty";
import Loading from "../../ui/loader";
import { useFetching } from "../../useFetching";
import { useEffect, useState } from "react";
import { serverAddress } from "../../serverAddress";
import SortingPanel from "../../ui/sortingPanel";
import { useSorting } from "../../useSorting";
import CustomButton from "../../ui/customButton";
import { setInitialFavList } from "../../slices/favourites/favourites";

const FavBlock = ({ setProductInfo }) => {
  const favList = useSelector((state) => state.favourites);

  const dispatch = useDispatch();

  const [favouritesData, setFavouritesData] = useState([]);

  // Sorting by price | product_name
  const [sortCriteria, setSortCriteria] = useState(false);
  const sortedProducts = useSorting(favouritesData, sortCriteria);

  const [fetchFavourites, isLoading, error] = useFetching(async () => {
    const response = await fetch(`${serverAddress}favourites`, {
      method: "POST",
      body: JSON.stringify({ fav_products: favList }),
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      credentials: "include",
    });

    const data = await response.json();
    setFavouritesData(data);
  });

  useEffect(() => {
    if (favList.length > 0) {
      fetchFavourites();
    } else {
      setFavouritesData([]);
    }
  }, [favList]);

  return (
    <div className="wrapper">
      <div className="main-block-wrapper fav">
        <SortingPanel setSortCriteria={setSortCriteria} sortCriteria={sortCriteria} />

        <div className="main-block-body-wrapper ">
          {sortedProducts.map((product) => {
            return <ProductCard key={product.id} product={product} setProductInfo={setProductInfo} />;
          })}

          {isLoading && <Loading />}
          {error && <BoardEmpty type={"error"}>{error}</BoardEmpty>}

          {favList.length === 0 ? <BoardEmpty>No favorites added</BoardEmpty> : null}
        </div>

        <div className="total-wrapper">
          <div className="submit-wrapper">
            <div className="total-text">Favourites:</div>
            <div className="total-price">{favList.length}</div>

            <CustomButton action={() => dispatch(setInitialFavList([]))}>Remove all</CustomButton>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FavBlock;
