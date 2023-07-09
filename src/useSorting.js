import { useMemo } from "react";

export const useSorting = (products, sortCriteria) => {
  const sortedProducts = useMemo(() => {
    switch (sortCriteria) {
      case "product_name":
        return [...products].sort((a, b) => a[sortCriteria].localeCompare(b[sortCriteria]));

      case "price":
        return [...products].sort((a, b) => a[sortCriteria] - b[sortCriteria]);

      default:
        return products;
    }
  }, [products, sortCriteria]);

  return sortedProducts;
};
