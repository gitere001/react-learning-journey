import { ArrowLeft, Loader2, Phone } from "lucide-react";
import PhoneInput from "./PhoneInput";
import "../../styles/paymentsModal.css";

function PaymentModal() {
  return (
    <div className="payment-container">
      <span className="back-button">
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
          <h2>Kes 300.00</h2>
        </div>
        <div className="payment-status idle">
          <PhoneInput />
        </div>
        <div className="payment-status processing">
          <Loader2 className="loader" />
          <h2>Processing Payment...</h2>
          <p>Please wait while we initiate your payment</p>
        </div>
        <div className="payment-status request-sent">
          <Phone className="icon" />
          <h2>Payment request sent!</h2>
          <p>Please enter your M-Pesa PIN on phone 0714584667</p>
        </div>
        <div className="payment-status checking-payment show-payment-modal">
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
        <div className="payment-status payment-success">
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
          <a className="return-home-button">Return to Home</a>
        </div>
        <div className="payment-status payment-error">
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
          <p>Transaction failed. Please try again.</p>
          <button className="retry-transaction">Try again</button>
        </div>
      </div>
    </div>
  );
}

export default PaymentModal;
