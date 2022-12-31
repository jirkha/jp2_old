import React, { useState, useEffect, useMemo } from "react";
import TableGlobal from "../Global/Tables/TableGlobal";
import { REMOVAL_COLUMNS } from "./RemovalColumns";
import { useDispatch, useSelector } from "react-redux";
import { getRemoval } from "../Store/Features/Material/removalSlice";
import { Popup } from "../Global/Other/Popup";
import Notification from "../Global/Notifications/Notification";
import RemovalForm from "./RemovalForm";

function TableRemoval() {

  const [openPopup, setOpenPopup] = useState(false);
    const [notify, setNotify] = useState({
      isOpen: false,
      message: "",
      type: "",
    });

  const removal_pre = useSelector((state) => state.removal.data);
  const removal = useMemo(() => removal_pre)
  const load = useSelector((state) => state.removal.loading);

  const dispatch = useDispatch();

    useEffect(() => {
      dispatch(getRemoval());
    }, []);

    const addAction = () => {
      setOpenPopup(true);
    };

    const editAction = () => {
      setNotify({
        isOpen: true,
        message:
          "Vyskladnění nelze editovat. Můžete ho smazat a vytvořit nové.",
        type: "warning",
      });
    };

  return (
    <div>
      {removal && (
        <TableGlobal
          columns={REMOVAL_COLUMNS}
          dataAPI={removal}
          loadingState={load}
          type="removal"
          name="vyskladnění"
          editAction={editAction}
          addAction={addAction}
        />
      )}
      <Popup
        title="Vyskladnění materiálu"
        openPopup={openPopup}
        setOpenPopup={setOpenPopup}
      >
        <RemovalForm setOpenPopup={setOpenPopup} />
      </Popup>
      <Notification notify={notify} setNotify={setNotify} />
    </div>
  );
}

export default TableRemoval;
