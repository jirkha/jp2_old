import React, { useState, useEffect } from "react";
import Axios from "axios";
import { useNavigate } from "react-router-dom";
import { useConfirm } from "material-ui-confirm";

import { Button } from "@mui/material";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import { useDispatch } from "react-redux";
import { getMaterial } from "../../Store/Features/Material/materialSlice";
import { getStorage } from "../../Store/Features/Material/storageSlice";
import { getRemoval } from "../../Store/Features/Material/removalSlice";
import { getProduct } from "../../Store/Features/Products/productSlice";
import { getTransaction } from "../../Store/Features/Products/transactionSlice";

export default function DeleteColumns(props) {

    const dispatch = useDispatch();
    const confirm = useConfirm();

  const itemDelete = (id, e) => {
    //console.log("id", id);
    e.preventDefault();
    confirm({
      //title: `Opravdu chtete vymazat položku ${type.name}?`,
      title: "Opravdu chtete vymazat položku/y?",
      titleProps: { color: "text.primary", fontSize: 20, fontWeight: "light" },
      cancellationButtonProps: { variant: "outlined" },
      confirmationButtonProps: { variant: "outlined" },
    })
    .then(() => {
    id.map((row) => { // prochází a postupně vymazává vybrané položky
      const id = row.original.id;
    if (props.typeTable === "item")
    {Axios.delete(`/api/item_delete/${id}`)
    .then(() => {
      console.log("Item Deleted!");
      dispatch(getMaterial());
      navigate("/material");
    })
    .catch((err) => console.log(err));
  } 
  else if (props.typeTable === "storage")
  {Axios.delete(`/api/storage_delete/${id}`)
    .then(() => {
      console.log("Storage Deleted!");
      dispatch(getStorage());
      navigate("/stock");
    })
    .catch((err) => console.log(err))}
  else if (props.typeTable === "removal") {
    Axios.delete(`/api/removal_delete/${id}`)
      .then(() => {
        console.log("Removal Deleted!");
        dispatch(getRemoval());
        navigate("/stock");
      })
      .catch((err) => console.log(err));
  } else if (props.typeTable === "product") {
    Axios.delete(`/api/product_delete/${id}`)
      .then(() => {
        console.log("Product Deleted!");
        dispatch(getProduct());
        navigate("/product");
      })
      .catch((err) => console.log(err));
  } else if (props.typeTable === "transaction") {
    Axios.delete(`/api/transaction_delete/${id}`)
      .then(() => {
        console.log("Transaction Deleted!");
        dispatch(getTransaction());
        navigate("/transaction");
      })
      .catch((err) => console.log(err));
  } else {
    console.log("nepodporovaný typ tabulky");
  }
  })}).catch(() => console.log("Deletion cancelled."));
  }

        const navigate = useNavigate();

  return (
    <Button
      type="delete"
      id={props.typeTable}
      //size="small"
      //variant="contained"
      //color="error"
      sx={{ mt: 1 }}
      startIcon={<DeleteOutlinedIcon />}
      disabled={props.disabledRow}
      onClick={(e) => itemDelete(props.selectedRows, e)}
      // onClick={(e) =>
      //   props.selectedRows.map(
      //     (row) => itemDelete(row.original.id, props.typeTable, e)
      //     //postDelete(row.original.id, e)
      //     //navigate("/")
      //   )
      // }
    >
      Vymazat
    </Button>
  );
}
