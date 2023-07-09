import "./style.css";
import Sidebar from "../../components/sidebar";
import { useSelector, useDispatch } from "react-redux";
import DisplayButton from "../../ui/displayButton";
import { setSidebar } from "./../../slices/hideSidebar/hideSidebar";
import ProductCard from "../../ui/productCard/productCard";
import BoardEmpty from "../../ui/boardEmpty/boardEmpty";
import Loading from "../../ui/loader";
import { useFetching } from "../../useFetching";
import { useEffect, useState } from "react";
import { setProducts } from "../../slices/products/products";
import { serverAddress } from "../../serverAddress";
import SortingPanel from "../../ui/sortingPanel";
import { useSorting } from "../../useSorting";

const MainBlock = ({ setProductInfo }) => {
  const selectedCategory = useSelector((state) => state.selectedCategory.category);
  const products = useSelector((state) => state.products.products);
  const sidebarVisibility = useSelector((state) => state.sidebar.hideSidebar);
  const dispatch = useDispatch();

  // Sorting by price | product_name
  const [sortCriteria, setSortCriteria] = useState(false);
  const sortedProducts = useSorting(products, sortCriteria);

  const [fetchProducts, isLoading, error] = useFetching(async () => {
    const response = await fetch(`${serverAddress}products?id=${selectedCategory}`, {
      credentials: "include",
    });
    const data = await response.json();
    dispatch(setProducts(data));
  });

  useEffect(() => {
    if (selectedCategory) {
      dispatch(setProducts([]));
      fetchProducts();
    }
  }, [selectedCategory]);

  return (
    <div className="wrapper">
      <Sidebar />

      <div className="main-block-wrapper">
        <SortingPanel setSortCriteria={setSortCriteria} sortCriteria={sortCriteria} />

        <div className="main-block-body-wrapper ">
          {sortedProducts.map((product) => {
            return <ProductCard key={product.id} product={product} setProductInfo={setProductInfo} />;
          })}

          {isLoading && <Loading />}
          {error && <BoardEmpty type={"error"}>{error}</BoardEmpty>}

          {!selectedCategory && <BoardEmpty>Please choose Shop</BoardEmpty>}
        </div>

        {sidebarVisibility && <DisplayButton action={() => dispatch(setSidebar(!sidebarVisibility))} />}
      </div>
    </div>
  );
};

export default MainBlock;
