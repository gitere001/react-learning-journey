import { useDispatch, useSelector } from "react-redux";
import "../styles/CartModal.css";
import { ShoppingCart } from "lucide-react";
import { checkingOut, closeCartModal } from "../features/cart/cartSlice";
import CartItem from "./CartItem";
import { openPaymentModal } from "../features/payment/paymentSlice";

export default function CartModal() {
  const { showCartModal, cart } = useSelector((state) => state.cart);
  
  const dispatch = useDispatch();

  const cartItemsElements = cart.map((prod) => (
    <CartItem
      key={prod.id}
      title={prod.title}
      price={prod.price}
      count={prod.count}
      id={prod.id}
    />
  ));
  const totalCart = cart.reduce(
    (acc, curr) => acc + curr.price * curr.count,
    0
  );

  return (
    <>
      <div className={`overly ${showCartModal ? "show-overly" : ""}`}></div>
      <div className={`cart-modal ${showCartModal ? "show-cart-modal" : ""}`}>
        <div className="modal-content">
          <span className="close" onClick={() => dispatch(closeCartModal())}>
            &times;
          </span>
          <h2 className="modal-heading">Your Cart</h2>
          {cart.length < 1 && (
            <div className="empty-cart">
              <ShoppingCart size={48} />
              <p>Cart is empty. Start shopping now!</p>
            </div>
          )}
          {cart.length > 0 && (
            <main className="card-modal-maincontent">
              <div className="cart-items-container">{cartItemsElements}</div>

              <div className="checkout-container">
                <button
                  onClick={() => {
                    dispatch(checkingOut(totalCart));
                    dispatch(openPaymentModal());
                  }}
                  className={`checkout-btn ${totalCart < 0 ? "disabled" : ""}`}
                  disabled={totalCart < 1}
                >
                  Checkout Kes <span>{totalCart.toFixed(2)}</span>
                </button>
              </div>
            </main>
          )}
        </div>
      </div>
    </>
  );
}
