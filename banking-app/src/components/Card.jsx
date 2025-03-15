import { Wallet } from "lucide-react";
import Modal from "./Modal";
import { useDispatch, useSelector } from "react-redux";
import { showDepositModal, showWithdrawModal } from "../features/Banking/transactionSlice";

const Card = () => {
 
  const balance = useSelector((state) => state.bank.balance);
  const dispatch = useDispatch();


  return (
    <div className="card">

      <Modal />

      <Wallet className="icon" />
      <h2 className="text-secondary text-regular ">Current Balance</h2>
      <h1 className="text-primary balance-amount">Kes {balance.toFixed(2)}</h1>
      <div className="btn-container">
        <button
          onClick={() => dispatch(showDepositModal())}
          className="button primary-button"
        >
          Deposit
        </button>
        <button
          onClick={() => dispatch(showWithdrawModal())}
          className="button secondary-button"
        >
          WithDraw
        </button>
      </div>
    </div>
  );
};

export default Card;
