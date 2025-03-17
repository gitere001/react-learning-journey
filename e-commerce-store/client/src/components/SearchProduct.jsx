import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { ACTIONS } from "./ProductList";
import searchProduct from "../utils/searchProducts";

function SearchProduct({ dispatchFilter, searchStr, setSearchStr }) {
  const products = useSelector((state) => state.products.products);

  useEffect(() => {
    if (searchStr.trim().length > 0) {
      dispatchFilter({
        type: ACTIONS.SEARCH_PRODUCT,
        payload: searchProduct(products, searchStr),
      });
    }
  }, [searchStr]);
  return (
    <section className="search-container">
      <form className="search-item-form">
        <input
          value={searchStr}
          onChange={(e) => setSearchStr(e.target.value)}
          type="text"
          placeholder="Search for item..."
        />
      </form>
    </section>
  );
}

export default SearchProduct;
