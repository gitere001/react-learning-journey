import "../styles/ProductList.css";
import PostCard from "./PostCard";
import { ShoppingCart, Filter } from "lucide-react";
import CartModal from "./CartModal";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useReducer, useState } from "react";
import { fetchProducts } from "../features/products/productsSlice";
import filterProducts from "../utils/filterProducts";
import SearchProduct from "./SearchProduct";
import { openCartModal } from "../features/cart/cartSlice";
import useDeviceType from "../utils/useDeviceType";

export const ACTIONS = {
  SORT_BY_NAME_ASC: "sort_by_name_asc",
  SORT_BY_NAME_DESC: "sort_by_name_desc",
  SORT_BY_PRICE_ASC: "sort_by_price_asc",
  SORT_BY_PRICE_DESC: "sort_by_price_desc",
  SEARCH_PRODUCT: "search_product",
};

function reducer(state, action) {
  switch (action.type) {
    case ACTIONS.SORT_BY_NAME_ASC:
      return {
        ...state,
        filter: ACTIONS.SORT_BY_NAME_ASC,
        products: filterProducts(action.payload, ACTIONS.SORT_BY_NAME_ASC),
      };
    case ACTIONS.SORT_BY_NAME_DESC:
      return {
        ...state,
        filter: ACTIONS.SORT_BY_NAME_DESC,
        products: filterProducts(action.payload, ACTIONS.SORT_BY_NAME_DESC),
      };
    case ACTIONS.SORT_BY_PRICE_ASC:
      return {
        ...state,
        filter: ACTIONS.SORT_BY_PRICE_ASC,
        products: filterProducts(action.payload, ACTIONS.SORT_BY_PRICE_ASC),
      };
    case ACTIONS.SORT_BY_PRICE_DESC:
      return {
        ...state,
        filter: ACTIONS.SORT_BY_PRICE_DESC,
        products: filterProducts(action.payload, ACTIONS.SORT_BY_PRICE_DESC),
      };
    case ACTIONS.SEARCH_PRODUCT:
      return {
        ...state,
        products: action.payload,
        filter: ACTIONS.SEARCH_PRODUCT,
      };
    default:
      return state;
  }
}

export default function ProductList() {
  const [filterOption, setFilterOption] = useState("name-asc");
  const [searchStr, setSearchStr] = useState("");
  const { loading, products, error } = useSelector((state) => state.products);
  const dispatch = useDispatch();
  const initialState = { filter: ACTIONS.SORT_BY_NAME_ASC, products: [] };
  const [state, dispatchFilter] = useReducer(reducer, initialState);
  const { cart } = useSelector((state) => state.cart);

  useEffect(() => {
    if (products && products.length > 0 && searchStr.trim() === "") {
      dispatchFilter({ type: state.filter, payload: products });
    }
  }, [products, state.filter]);
  console.log(useDeviceType());

  const productsElements = state.products.map((product) => (
    <PostCard
      key={product.id}
      title={product.title}
      image={product.image}
      price={product.price}
      id={product.id}
    />
  ));

  function handleChangeFilter(e) {
    if (searchStr.trim() === "") {
      const selectedFilter = e.target.value;
      setFilterOption(selectedFilter);
      switch (selectedFilter) {
        case "name-asc":
          dispatchFilter({ type: ACTIONS.SORT_BY_NAME_ASC, payload: products });
          break;
        case "name-desc":
          dispatchFilter({
            type: ACTIONS.SORT_BY_NAME_DESC,
            payload: products,
          });
          break;
        case "price-asc":
          dispatchFilter({
            type: ACTIONS.SORT_BY_PRICE_ASC,
            payload: products,
          });
          break;
        case "price-desc":
          dispatchFilter({
            type: ACTIONS.SORT_BY_PRICE_DESC,
            payload: products,
          });
          break;
        default:
          dispatchFilter({ type: ACTIONS.SORT_BY_NAME_ASC, payload: products });
          break;
      }
    }
  }

  return (
    <div className="fetch-data-container">
      <header className="header">
        <h2>FakeStore</h2>
        <i className="filter-icon">
          <Filter />
        </i>
        <select
          className="filter"
          value={filterOption}
          onChange={(e) => handleChangeFilter(e)}
        >
          <option value="name-asc">Name (A-Z)</option>
          <option value="name-desc">Name (Z-A)</option>
          <option value="price-asc">Price (Low to High)</option>
          <option value="price-desc">Price (High to Low)</option>
        </select>

        <i className="cart" onClick={() => dispatch(openCartModal())}>
          {cart.length > 0 && <span className="cart-item-number">{cart.reduce((acc, cur) => acc+cur.count, 0)}</span>}
          <ShoppingCart />
        </i>
        <CartModal />
      </header>

      <main className="main-section">
        <SearchProduct
          dispatchFilter={dispatchFilter}
          searchStr={searchStr}
          setSearchStr={setSearchStr}
        />
        <div className="posts-container">
          {searchStr.trim().length > 0 && state.products.length < 1 && (
            <div className="search-not-found">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                width="40"
                height="40"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <circle cx="11" cy="11" r="8" />
                <line x1="21" y1="21" x2="16.65" y2="16.65" />
              </svg>
              <h3>Product not found</h3>
              <p>Try another search.</p>
            </div>
          )}
          {loading && <p className="loading">Loading..</p>}
          {error && !loading && products.length < 1 && (
            <div className="fetch-error">
              <p>Unable to fetch Products</p>
              <button onClick={() => dispatch(fetchProducts())}>Reflesh</button>
            </div>
          )}
          {productsElements}
        </div>
      </main>
    </div>
  );
}
