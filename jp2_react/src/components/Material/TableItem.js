import React, { useState, useEffect } from "react";
import TableGlobal from "../Global/Tables/TableGlobal";
import { ITEM_COLUMNS } from "./ItemColumns";
import { useDispatch, useSelector } from "react-redux";
import { getMaterial } from "../Store/Features/Material/materialSlice";
import { Popup } from "../Global/Other/Popup";
import AddItemForm from "./AddItemForm";

function TableItem() {
  const [openPopup, setOpenPopup] = useState(false);
  const [item, setItem] = useState(undefined)
  const [title, setTitle] = useState("Vložení nového materiálu");

  useEffect(() => {
    dispatch(getMaterial());
  }, []);

  const editAction = (item) => {
    console.log("item", item);
    setItem(item);
    setTitle(`Editace materiálu ${item.name}`);
    setOpenPopup(true);
  };

  const addAction = () => {
    setItem(undefined);
    setTitle("Vložení nového materiálu");
    setOpenPopup(true);
  };

  const material = useSelector((state) => state.material.data);
  const load = useSelector((state) => state.material.loading);
  const dispatch = useDispatch();

  return (
    <div>
      {material && (
        <TableGlobal
          columns={ITEM_COLUMNS}
          loadingState={load}
          dataAPI={material}
          type="item"
          name="materiál"
          editAction={editAction}
          addAction={addAction}
        />
      )}
      <Popup title={title} openPopup={openPopup} setOpenPopup={setOpenPopup}>
        <AddItemForm item={item} setOpenPopup={setOpenPopup} />
      </Popup>
    </div>
  );
}

export default TableItem;
