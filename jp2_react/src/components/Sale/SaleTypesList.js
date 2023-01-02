import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getSaleType } from "../Store/Features/Products/saleTypeSlice";
import Axios from "axios";
import { useConfirm } from "material-ui-confirm";

import BasicCard from '../Global/Other/BasicCard';

import { Button, Container, Grid, CardActionArea, Typography } from "@mui/material";
import { Popup2 } from "../Global/Other/Popup2";
import AddSaleTypeForm from "./AddSaleTypeForm";
import { Stack } from "@mui/system";
import Notification from "../Global/Notifications/Notification";

function SaleTypesList() {
  const dispatch = useDispatch();
  const confirm = useConfirm();
  const saleType = useSelector((state) => state.saleType.data);
  const [openPopup2, setOpenPopup2] = useState(false);
  const [saleTypeObj, setSaleTypeObj] = useState("");
  const [notify, setNotify] = useState({
    isOpen: false,
    message: "",
    type: "",
  });

  useEffect(() => {
    dispatch(getSaleType());
    //console.log("materialType", materialType);
  }, []);

  const editAction = (type) => {
    console.log("type", type);
    setSaleTypeObj(type);
    setOpenPopup2(true);
  };

  const addAction = () => {
    setSaleTypeObj(undefined);
    setOpenPopup2(true);
  };

  const handleClose = () => {
    setOpenPopup2(false);
  };

  const saleTypeDelete = (type, e) => {
    e.preventDefault();
    confirm({
      title: `Opravdu chtete vymazat položku ${type.name}? Akci nelze vrátit zpět!`,
      titleProps: { color: "text.primary", fontSize: 20, fontWeight: "light" },
      cancellationButtonProps: { variant: "outlined" },
      confirmationButtonProps: { variant: "outlined" },
    })
      .then(() => {
        Axios.delete(`/api/saleType_delete/${type.id}`)
          .then(() => {
            console.log("Deleted!");
            dispatch(getSaleType());
            setNotify({
              isOpen: true,
              message: `Druh prodejního kanálu ${type.name} byl odstraněn`,
              type: "warning",
            });
          })
          .catch((err) => {
            console.log(err);
            setNotify({
              isOpen: true,
              message:
                "Není možno odstranit druh prodejního kanálu, protože by pravděpodobně došlo k odstranění všech prodejních kanálů tohoto typu! Tento druh prodejního kanálu lze pouze upravit.",
              type: "error",
            });
          });
      })
      .catch(() => console.log("Deletion cancelled."));
  };

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
            Přidat druh prodejního kanálu
          </Button>
        </Stack>
        <Typography variant="subtitle2">
          Položky seřazeny dle abecedy
        </Typography>
        <Grid container spacing={{ xs: 2, md: 2 }}>
          {saleType.map((type) => (
            <Grid item xs={6} sm={5} md={3} lg={2} key={type.id}>
              {/* <Paper elevation={2}> */}
              <BasicCard
                typeItem="Druh prodejního kanálu"
                type={type} //místo posílání type zabudovat useRef
                typeCount={type.sale_count}
                delete={saleTypeDelete} //využít useRef, aby se nemuselo id posílat tam a zpět
                edit={editAction}
                ref={type}
              />
              {/* </Paper> */}
            </Grid>
          ))}
        </Grid>
        {saleTypeObj ? (
          <Popup2
            title={`Editace druhu prodej. kanálu ${saleTypeObj.name}`}
            openPopup2={openPopup2}
            setOpenPopup2={setOpenPopup2}
          >
            <AddSaleTypeForm
              handleClose={handleClose}
              saleTypeObj={saleTypeObj}
            />
          </Popup2>
        ) : (
          <Popup2
            title="Vložení prodejního kanálu"
            openPopup2={openPopup2}
            setOpenPopup2={setOpenPopup2}
          >
            <AddSaleTypeForm
              handleClose={handleClose}
              productTypeObj={saleTypeObj}
            />
          </Popup2>
        )}
      </Container>
      <Notification notify={notify} setNotify={setNotify} />
    </>
  );
}

export default SaleTypesList;