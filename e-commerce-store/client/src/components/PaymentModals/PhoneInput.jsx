import { Phone } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { stkPush, stkQuery } from "../../features/payment/paymentSlice";
import { useEffect, useRef, useState } from "react";
import { clearCart } from "../../features/cart/cartSlice";


function PhoneInput({mobile, setMobile}) {
  const dispatch = useDispatch();
  const cartTotal = parseFloat(useSelector((state) => state.cart.cartTotal));
  const {
    paymentStatus,
    error,
    showPaymentModal,
    checkoutRequestID,
    stkQueryResultCode,
  } = useSelector((state) => state.payment);

  const validNumber = !/^(07|01)\d{8}$/.test(mobile);
  const intervalRef = useRef(null);
  const timeoutRef = useRef(null);

  useEffect(() => {
    if (paymentStatus === "payment-success" || showPaymentModal === false) {
      setMobile("");
    }
  }, [paymentStatus, showPaymentModal]);

  useEffect(() => {
    if (checkoutRequestID) {
      const delay = setTimeout(() => {
        intervalRef.current = setInterval(() => {
          dispatch(stkQuery({ reqId: checkoutRequestID }));
        }, 2000);

        timeoutRef.current = setTimeout(() => {
          if (intervalRef.current) {
            clearInterval(intervalRef.current);
            intervalRef.current = null;
          }
        }, 120000);
      }, 2000);

      return () => {
        clearTimeout(delay);
        if (intervalRef.current) {
          clearInterval(intervalRef.current);
          intervalRef.current = null;
        }
        if (timeoutRef.current) {
          clearTimeout(timeoutRef.current);
          timeoutRef.current = null;
        }
      };
    }
  }, [checkoutRequestID, dispatch]);

  useEffect(() => {
    if (stkQueryResultCode !== null) {
      if (stkQueryResultCode === "0") {
        dispatch(clearCart());
      }
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
        timeoutRef.current = null;
      }
    }
  }, [stkQueryResultCode]);

  function handleSendOtp(e) {
    e.preventDefault();
    dispatch(stkPush({ phoneNumber: mobile, amount: cartTotal }));
  }

  return (
    <form onSubmit={(e) => handleSendOtp(e)} className="payment-form">
      <label htmlFor="mpesaNumber">M-Pesa Number</label>
      <div className="phone-input-wrapper">
        <Phone className="phone-icon" />
        <input
          value={mobile}
          onChange={(e) => setMobile(e.target.value)}
          type="number"
          placeholder="07XXXXXX or 01XXXXXXXX"
        />
      </div>
      <button
        disabled={validNumber}
        title={validNumber ? "Enter a valid number" : ""}
        className="pay-now-button payment-btn"
      >
        Pay Now
      </button>
    </form>
  );
}

export default PhoneInput;
