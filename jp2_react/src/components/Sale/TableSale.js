import React, { useState, useEffect } from "react";
import TableGlobal from "../Global/Tables/TableGlobal";
import { SALE_COLUMNS } from "../Sale/SaleColumns";
import { useDispatch, useSelector } from "react-redux";
import { getSale } from "../Store/Features/Products/saleSlice";
import { Popup } from "../Global/Other/Popup";
import AddSaleForm from "./AddSaleForm";

function TableSale() {
  const [openPopup, setOpenPopup] = useState(false);
  const [editedSale, setEditedSale] = useState(undefined);
  const [title, setTitle] = useState("Vložení prodejního kanálu");

  useEffect(() => {
    dispatch(getSale());
  }, []);

  const sale = useSelector((state) => state.sale.data);
  const load = useSelector((state) => state.sale.loading);
  const dispatch = useDispatch();

  const editAction = (editedSale) => {
    setEditedSale(editedSale);
    setTitle(`Editace prodejního kanálu ${editedSale.name}`);
    setOpenPopup(true);
  };

  const addAction = () => {
    setEditedSale(undefined);
    setTitle("Vložení prodejního kanálu");
    setOpenPopup(true);
  };

  return (
    <div>
      {sale && (
        <TableGlobal
          columns={SALE_COLUMNS}
          dataAPI={sale}
          loadingState={load}
          type="sale"
          name="prodejní kanál"
          editAction={editAction}
          addAction={addAction}
        />
      )}
      <Popup title={title} openPopup={openPopup} setOpenPopup={setOpenPopup}>
        <AddSaleForm editedSale={editedSale} setOpenPopup={setOpenPopup} />
      </Popup>
    </div>
  );
}

export default TableSale;
