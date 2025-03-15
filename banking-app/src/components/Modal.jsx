import { X } from "lucide-react";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  depositMoney,
  withdrawMoney,
  closeModal,
} from "../features/Banking/transactionSlice";

const Modal = () => {
  const activeModal = useSelector((state) => state.bank.activeModal);
  const balance = useSelector((state) => state.bank.balance);
  const [amount, setAmount] = useState("");
  const [feedBack, setFeedback] = useState({ type: null, message: "" });
  const dispatch = useDispatch();
  function handleSubmit(e) {
    e.preventDefault();
    if (activeModal === "deposit") {
      dispatch(depositMoney(amount));
      setAmount(0);
      dispatch(closeModal());
    } else if (activeModal === "withdraw") {
      if (amount > balance) {
        setFeedback({ type: "error", message: "Insufficient Funds" });
        setTimeout(() => {
          setFeedback({ type: null, message: "" });
        }, 2000);
      } else {
        dispatch(withdrawMoney(amount));
        setAmount("");
        dispatch(closeModal());
      }
    }
  }

  function handleCloseModal() {
    setAmount("")
    dispatch(closeModal())

  }
  return (
    <>
      <div
        className={`modal-overlay ${
          activeModal !== null ? "show-overlay" : ""
        }`}
      ></div>
      <div className={`modal ${activeModal !== null ? "show-modal" : ""}`}>
        <div
          className={`feedBack ${
            feedBack.type === "error" ? "show-Error" : ""
          }`}
        >
          <p className="error-message">{feedBack.message}</p>
        </div>
        <X className="close-button" onClick={handleCloseModal} />
        <h2 className="modal-title">
          Make a {activeModal === "deposit" ? "Deposit" : "Withdraw"}
        </h2>
        <form className="modal-form" onSubmit={handleSubmit}>
          <label className="label label-text" htmlFor="amount">
            Enter Amount
          </label>
          <input
            className="input"
            type="number"
            id="amount"
            placeholder="Kes 0.00"
            value={amount}
            onChange={(e) => {
              const value = e.target.value.trim();
              if (value === "") {
                setAmount("");
              } else if (!isNaN(value)) {
                setAmount(parseFloat(value) || 0);
              }
            }}
          />
          <button
            disabled={!amount || amount <= 0}
            title={!amount || amount <= 0 ? "Enter a valid amount" : ""}
            className={`button primary-button ${
              !amount || amount <= 0 ? "disabled" : ""
            }`}
          >
            Confirm {activeModal === "deposit" ? "Deposit" : "Withdraw"}
          </button>
        </form>
      </div>
    </>
  );
};

export default Modal;
