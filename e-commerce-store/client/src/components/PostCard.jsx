import { useDispatch } from "react-redux";
import { addItemToCart, removeItemFromCart } from "../features/cart/cartSlice";


export default function PostCard({image, title, price, id}) {
  const dispatch=useDispatch()
  const finalPrice = Number(String(price).charAt(0))
  return (
    <article className="post-card">
      <div className="post-image">
        <img src={image} alt="jacket" />
      </div>
      <div className="item-details">
        <p className="post-description">{title}</p>
        <h3>Kes {String(price).charAt(0)}</h3>
      </div>

      <div className="action-buy">
        <button onClick={() => dispatch(addItemToCart({title, price:finalPrice, id}))} className="item-btn add-cart">Add to Cart</button>
        <button onClick={()=> dispatch(removeItemFromCart(id))} className="item-btn buy-now">Buy Now</button>
      </div>
    </article>
  );
}