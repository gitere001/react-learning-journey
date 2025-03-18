import { ArrowLeft, Loader2, Phone } from "lucide-react";
import PhoneInput from "./PhoneInput";
import "../../styles/paymentsModal.css";
import { useDispatch, useSelector } from "react-redux";
// import CartModal from "../CartModal";
import {
  closePaymentModal,
  resetPaymentStatus,
} from "../../features/payment/paymentSlice";
import { useState } from "react";
// 'idle', 'processing', 'request-sent', 'checking-payment' 'payment-success', 'payment-error'

function PaymentModal() {
  const [mobile, setMobile] = useState("");
  const totalMoney = useSelector((state) => state.cart.cartTotal);
  const { paymentStatus, error, showPaymentModal, checkoutRequestID } =
    useSelector((state) => state.payment);
  const dispatch = useDispatch();
  console.log(paymentStatus);
  function handleReturnHome() {
    dispatch(resetPaymentStatus());
    dispatch(closePaymentModal());
  }

  return (
    <div
      className={`payment-container ${
        showPaymentModal ? "show-main-payment-container" : ""
      }`}
    >
      <span
        onClick={() => dispatch(closePaymentModal())}
        className="back-button"
      >
        <ArrowLeft />
        Back
      </span>
      <div className="payment-wrapper">
        <h1 className="Checkout-heading">Checkout</h1>
        <p className="Checkout-subheading">
          Complete your purchase using M-Pesa
        </p>
        <hr className="Checkout-border" />
        <div className="payment-amount">
          <span>Amount</span>
          <h2>Kes {totalMoney.toFixed(2)}</h2>
        </div>
        {/* <CartModal /> */}
        <div
          className={`payment-status idle ${
            paymentStatus === "idle" ? "show-payment-modal" : ""
          }`}
        >
          <PhoneInput mobile={mobile} setMobile={setMobile}/>
        </div>
        <div
          className={`payment-status processing ${
            paymentStatus === "processing" ? "show-payment-modal" : ""
          }`}
        >
          <Loader2 className="loader" />
          <h2>Processing Payment...</h2>
          <p>Please wait while we initiate your payment</p>
        </div>
        <div
          className={`payment-status request-sent ${
            paymentStatus === "request-sent" ? "show-payment-modal" : ""
          }`}
        >
          <Phone className="icon" />
          <h2>Payment request sent!</h2>
          <p>Please enter your M-Pesa PIN on phone {mobile}</p>
        </div>
        <div
          className={`payment-status checking-payment ${
            paymentStatus === "checking-payment" ? "show-payment-modal" : ""
          }`}
        >
          <div className="checking-icon-container">
            <svg
              className="checking-icon"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <circle
                className="checking-circle"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="2"
              />
              <path
                className="checking-dot"
                d="M12 6V12L16 14"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
          </div>
          <h2>Checking payment status...</h2>
          <p>Please wait while we verify your transaction</p>
        </div>
        <div
          className={`payment-status payment-success ${
            paymentStatus === "payment-success" ? "show-payment-modal" : ""
          }`}
        >
          <div className="success-icon-container">
            <svg
              className="success-icon"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>

          <h2>Payment Successful!</h2>
          <p>Thank you for your purchase</p>
          <a className="return-home-button" onClick={() => handleReturnHome()}>
            Return to Home
          </a>
        </div>
        <div
          className={`payment-status payment-error ${
            paymentStatus === "payment-failed" ? "show-payment-modal" : ""
          }`}
        >
          <div className="error-icon-container">
            <svg
              className="error-icon"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </div>
          <h2>Payment failed</h2>
          <p>{error}</p>
          <button
            className="retry-transaction"
            onClick={() => dispatch(resetPaymentStatus())}
          >
            Try again
          </button>
        </div>
      </div>
    </div>
  );
}

export default PaymentModal;
