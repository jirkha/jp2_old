import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProductType } from "../Store/Features/Products/productTypeSlice";
import Axios from "axios";
import { useConfirm } from "material-ui-confirm";

import BasicCard from '../Global/Other/BasicCard';

import { Button, Container, Grid, CardActionArea, Typography } from "@mui/material";
import { Popup2 } from "../Global/Other/Popup2";
import AddProductTypeForm from "./AddProductTypeForm";
import { Stack } from "@mui/system";
import Notification from "../Global/Notifications/Notification";

function ProductTypesList() {

  const dispatch = useDispatch();
  const confirm = useConfirm();
  const productType = useSelector((state) => state.productType.data);
  const [openPopup2, setOpenPopup2] = useState(false);
  const [productTypeObj, setProductTypeObj] = useState("");
  const [notify, setNotify] = useState({
    isOpen: false,
    message: "",
    type: "",
  });

  useEffect(() => {
    dispatch(getProductType());
    //console.log("materialType", materialType);
  }, []);

  const editAction = (type) => {
    console.log("type", type);
    setProductTypeObj(type);
    setOpenPopup2(true);
  };

  const addAction = () => {
    setProductTypeObj(undefined);
    setOpenPopup2(true);
  };

  const handleClose = () => {
    setOpenPopup2(false);
  };

  const productTypeDelete = (type, e) => {
    e.preventDefault();
    confirm({
      title: `Opravdu chtete vymazat položku ${type.name}? Akce nejde vrátit zpět!`,
      titleProps: { color: "text.primary", fontSize: 20, fontWeight: "light" },
      cancellationButtonProps: { variant: "outlined" },
      confirmationButtonProps: { variant: "outlined" },
    })
      .then(() => {
        Axios.delete(`/api/productType_delete/${type.id}`)
          .then(() => {
            console.log("Deleted!");
            //console.log("productId", productId);
            dispatch(getProductType());
            setNotify({
              isOpen: true,
              message: `Druh materiálu ${type.name} byl odstraněn`,
              type: "warning",
            });
          })
          .catch((err) => {
            console.log(err);
            setNotify({
              isOpen: true,
              message:
                "Není možno odstranit druh produktu, protože by pravděpodobně došlo k odstranění všech produktů tohoto typu! Tento druh produktu lze pouze upravit.",
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
            Přidat nový druh produktu
          </Button>
        </Stack>
        <Typography variant="subtitle2">
          Položky seřazeny dle abecedy
        </Typography>
        <Grid container spacing={{ xs: 2, md: 2 }}>
          {productType.map((type) => (
            <Grid item xs={6} sm={5} md={3} lg={2} key={type.id}>
              {/* <Paper elevation={2}> */}
              <BasicCard
                typeItem="Druh produktu"
                type={type} //místo posílání type zabudovat useRef
                typeCount={type.product_count}
                delete={productTypeDelete} //využít useRef, aby se nemuselo id posílat tam a zpět
                edit={editAction}
                ref={type}
              />
              {/* </Paper> */}
            </Grid>
          ))}
        </Grid>
        {productTypeObj ? (
          <Popup2
            title={`Editace druhu produktu ${productTypeObj.name}`}
            openPopup2={openPopup2}
            setOpenPopup2={setOpenPopup2}
          >
            <AddProductTypeForm
              handleClose={handleClose}
              productTypeObj={productTypeObj}
            />
          </Popup2>
        ) : (
          <Popup2
            title="Vložení nového druhu produktu"
            openPopup2={openPopup2}
            setOpenPopup2={setOpenPopup2}
          >
            <AddProductTypeForm
              handleClose={handleClose}
              productTypeObj={productTypeObj}
            />
          </Popup2>
        )}
      </Container>
      <Notification notify={notify} setNotify={setNotify} />
    </>
  );
}

export default ProductTypesList;