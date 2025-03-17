import { useDispatch } from "react-redux";
import { decrementItemQuantity, incrementItemQuantity, removeItemFromCart } from "../features/cart/cartSlice";

export default function CartItem({title, price, count, id}) {
  const dispatch = useDispatch()
  return (

    <div className="cart-item">
      <div>
        <div className="item-title">{title}</div>
        <div className="item-price">Kes {price.toFixed(2)}</div>
      </div>
      <div className="quantity-controls">
        <button onClick={()=>dispatch(decrementItemQuantity(id))} className="quantity-btn">-</button>
        <span>{count}</span>
        <button onClick={()=> dispatch(incrementItemQuantity(id))} className="quantity-btn">+</button>
        <button onClick={()=>dispatch(removeItemFromCart(id))} className="remove-btn">Remove</button>
      </div>
    </div>
  );
}
