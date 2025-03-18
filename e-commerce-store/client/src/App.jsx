import { useDispatch, useSelector } from "react-redux";
import ProductList from "./components/ProductList";

import PaymentModal from "./components/PaymentModals/PaymentModal";
import { useEffect } from "react";
import { fetchProducts } from "./features/products/productsSlice";

function App() {
  const dispatch=useDispatch()
  useEffect(() => {
      dispatch(fetchProducts());
    }, []);
  const showPaymentModal = useSelector(
    (state) => state.payment.showPaymentModal
  );
  // console.log(showPaymentModal);
  return (
    <>
      {!showPaymentModal && <ProductList />}
      {showPaymentModal && <PaymentModal />}
    </>
  );
}

export default App;
