import React, { useState, useEffect, useMemo } from "react";
import TableGlobal from "../Global/Tables/TableGlobal";
import { STORAGE_COLUMNS } from "../Stock/StorageColumns";
import { useDispatch, useSelector } from "react-redux";
import { getStorage } from "../Store/Features/Material/storageSlice";
import { loading } from "../Store/Features/Material/storageSlice";
import { Popup } from "../Global/Other/Popup";
import Notification from "../Global/Notifications/Notification";
import StorageForm from "./StorageForm";

function TableStorage() {

  const [openPopup, setOpenPopup] = useState(false);
  const [notify, setNotify] = useState({
    isOpen: false,
    message: "",
    type: "",
  });
  
  const storage_pre = useSelector((state) => state.storage.data);
  const storage = useMemo(() => storage_pre);
  const load = useSelector(loading);

  const dispatch = useDispatch();

    useEffect(() => {
      dispatch(getStorage());
    }, []);

    const addAction = () => {
      setOpenPopup(true);
    };

    const editAction = () => {
      setNotify({
        isOpen: true,
        message: "Naskladnění nelze editovat. Můžete ho smazat a vytvořit nové.",
        type: "warning",
      });
    }

  return (
    <div>
      {storage && (
        <TableGlobal
          columns={STORAGE_COLUMNS}
          dataAPI={storage}
          loadingState={load}
          type="storage"
          name="naskladnění"
          editAction={editAction}
          addAction={addAction}
        />
      )}
      <Popup
        title="Naskladnění materiálu"
        openPopup={openPopup}
        setOpenPopup={setOpenPopup}
      >
        <StorageForm setOpenPopup={setOpenPopup} />
      </Popup>
      <Notification notify={notify} setNotify={setNotify} />
    </div>
  );
}

export default TableStorage;
