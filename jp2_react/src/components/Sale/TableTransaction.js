import React, { useState, useEffect } from "react";
import TableGlobal from "../Global/Tables/TableGlobal";
import { TRANSACTION_COLUMNS } from "./TransactionColumns";
import { useDispatch, useSelector } from "react-redux";
import Axios from "axios";
import { Popup } from "../Global/Other/Popup";
import { getTransaction } from "../Store/Features/Products/transactionSlice";
import AddTransactionForm from "./AddTransactionForm";
import DateRangePicker from "../Global/DateTimePicker/DateRangePicker";

function TableTransaction() {

    const [openPopup, setOpenPopup] = useState(false);
    const [editedTransaction, setEditedTransaction] = useState(undefined);
    const [title, setTitle] = useState("Vložení nové transakce");
    const [transaction, setData] = useState(undefined);

  useEffect(() => {
    dispatch(getTransaction());
  }, []);


  const transactionFull = useSelector((state) => state.transaction.data);
  const load = useSelector((state) => state.transaction.loading);
  const dispatch = useDispatch();

  const onSubmit = (values) => {
    //console.log("CurrentPrice")
    const { day_from, day_to } = values;
    Axios.post("/api/list_transaction/", {
      day_from,
      day_to,
    })
      .then((res) => {
        console.log("Filtering: ", res.data);
        setData(res.data);
        //dispatch(getSale()); //aktualizuje seznam prodejních kanálů
      })
      .catch((err) => console.log(err));
  };

  const editAction = (editedTransaction) => {
    setEditedTransaction(editedTransaction);
    setTitle(`Editace transakce ID ${editedTransaction.id}`);
    setOpenPopup(true);
  };

  const addAction = () => {
    setEditedTransaction(undefined);
    setTitle("Vložení nové transakce");
    setOpenPopup(true);
  };

  const closeOpenPopup = () => {
    setOpenPopup(false)
  }

  const resetTable = () => {
    setData(transactionFull);
  }



  return (
    <div>
      <DateRangePicker onSubmit={onSubmit} resetTable={resetTable} />
      {transactionFull && (
        <TableGlobal
          columns={TRANSACTION_COLUMNS}
          dataAPI={transaction ? transaction : transactionFull}
          loadingState={load}
          type="transaction"
          name="transakci"
          editAction={editAction}
          addAction={addAction}
        />
      )}
      <Popup title={title} openPopup={openPopup} setOpenPopup={setOpenPopup}>
        <AddTransactionForm
          editedTransaction={editedTransaction}
          closeOpenPopup={closeOpenPopup}
        />
      </Popup>
    </div>
  );
}

export default TableTransaction;
