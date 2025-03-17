import { useSelector } from "react-redux";
import ProductList from "./components/ProductList";

import PaymentModal from "./components/PaymentModals/PaymentModal";

function App() {
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
