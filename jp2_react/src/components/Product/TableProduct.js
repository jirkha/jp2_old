import React, { useState, useEffect } from "react";
import TableGlobal from "../Global/Tables/TableGlobal";
import { PRODUCT_COLUMNS } from "./ProductColumns";
import { useDispatch, useSelector } from "react-redux";
import { getProduct } from "../Store/Features/Products/productSlice";
import { Popup } from "../Global/Other/Popup";
import AddProductForm from "./AddProductForm";

function TableProduct() {

  const [openPopup, setOpenPopup] = useState(false);
  const [editedProduct, setEditedProduct] = useState(undefined);
  const [title, setTitle] = useState("Vložení nového produktu");

useEffect(() => {
  dispatch(getProduct());
}, []);

const product = useSelector((state) => state.product.data);
const load = useSelector((state) => state.product.loading);
const dispatch = useDispatch();

  const editAction = (editedProduct) => {
    setEditedProduct(editedProduct);
    setTitle(`Editace produktu ${editedProduct.name}`);
    setOpenPopup(true);
  };

  const addAction = () => {
    setEditedProduct(undefined);
    setTitle("Vložení nového produktu");
    setOpenPopup(true);
  };



  return (
    <div>
      {product && (
        <TableGlobal
          columns={PRODUCT_COLUMNS}
          dataAPI={product}
          loadingState={load}
          type="product"
          name="produkt"
          editAction={editAction}
          addAction={addAction}
        />
      )}
      <Popup title={title} openPopup={openPopup} setOpenPopup={setOpenPopup}>
        <AddProductForm
          editedProduct={editedProduct}
          setOpenPopup={setOpenPopup}
        />
      </Popup>
    </div>
  );
}

export default TableProduct;
