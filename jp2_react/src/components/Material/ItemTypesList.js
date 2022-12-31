import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getMaterialType } from "../Store/Features/Material/materialTypeSlice";
import Axios from "axios";
import { useConfirm } from "material-ui-confirm";

import BasicCard from '../Global/Other/BasicCard';

import { Button, Container, Grid, CardActionArea, Typography } from "@mui/material";
import { Popup2 } from "../Global/Other/Popup2";
import AddItemTypeForm from "./AddItemTypeForm";
import { Stack } from "@mui/system";
import Notification from "../Global/Notifications/Notification";

function ItemTypesList() {

    const dispatch = useDispatch();
    const confirm = useConfirm();
    const materialType = useSelector((state) => state.materialType.data);
    const [openPopup2, setOpenPopup2] = useState(false);
    const [materialTypeObj, setMaterialTypeObj] = useState("")
    const [notify, setNotify] = useState({
      isOpen: false,
      message: "",
      type: "",
    });

    useEffect(() => {
      dispatch(getMaterialType());
      //console.log("materialType", materialType);
    }, []);

    const editAction = (type) => {
      console.log("type",type)
        setMaterialTypeObj(type);
        setOpenPopup2(true);
    }

    const addAction = () => {
        setMaterialTypeObj(undefined);
        setOpenPopup2(true);
    }

      const handleClose = () => {
        setOpenPopup2(false);
      };

    const itemTypeDelete = (type, e) => {
    e.preventDefault();
    confirm({
      title: `Opravdu chtete vymazat položku ${type.name}?`,
      titleProps: { color: "text.primary", fontSize: 20, fontWeight: "light" },
      cancellationButtonProps: { variant: "outlined" },
      confirmationButtonProps: { variant: "outlined" },
    })
      .then(() => {
        Axios.delete(`/api/itemType_delete/${type.id}`)
          .then(() => {
            console.log("Deleted!");
            //console.log("productId", productId);
            dispatch(getMaterialType());
            setNotify({
              isOpen: true,
              message: `Typ materiálu ${type.name} byl odstraněn`,
              type: "warning",
            });
          })
          .catch((err) => {
            console.log(err);
            setNotify({
              isOpen: true,
              message:
                "Není možno odstranit typ materiálu, protože by pravděpodobně došlo k odstranění všech produktů tohoto typu! Typ materiálu lze upravit.",
              type: "error",
            });
          });
      })
      .catch(() => console.log("Deletion cancelled."));
}

  return (
    <>
      <Container>
        <Stack direction="row" justifyContent="center" mb={2}>
          <Button
            variant="contained"
            color="primary"
            //onClick={(() => setOpenPopup2(true), setMaterialTypeObj(undefined))}
            onClick={addAction}
          >
            Přidat nový druh materiálu
          </Button>
        </Stack>
        <Typography variant="subtitle2">
          Položky seřazeny dle abecedy
        </Typography>
        <Grid container spacing={{ xs: 2, md: 2 }}>
          {materialType.map((type) => (
            <Grid item xs={6} sm={5} md={3} lg={2} key={type.id}>
              {/* <Paper elevation={2}> */}
              <BasicCard
                typeItem="Druh materiálu"
                type={type} //místo posílání type zabudovat useRef
                typeCount={type.material_count}
                delete={itemTypeDelete} //využít useRef, aby se nemuselo id posílat tam a zpět
                edit={editAction}
                //ref={type}
              />
              {/* </Paper> */}
            </Grid>
          ))}
        </Grid>
        {materialTypeObj ? (
          <Popup2
            title={`Editace typu materiálu ${materialTypeObj.name}`}
            openPopup2={openPopup2}
            setOpenPopup2={setOpenPopup2}
          >
            <AddItemTypeForm
              handleClose={handleClose}
              materialTypeObj={materialTypeObj}
            />
          </Popup2>
        ) : (
          <Popup2
            title="Vložení typu materiálu"
            openPopup2={openPopup2}
            setOpenPopup2={setOpenPopup2}
          >
            <AddItemTypeForm
              handleClose={handleClose}
              materialTypeObj={materialTypeObj}
            />
          </Popup2>
        )}
      </Container>
      <Notification notify={notify} setNotify={setNotify} />
    </>
  );
}

export default ItemTypesList