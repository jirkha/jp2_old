import React, { useState, useEffect } from "react";
import * as Yup from "yup";
import { Formik, Form } from "formik";
import Axios from "axios";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import TextField from "../Global/Textfield";
import DeleteIcon from "@mui/icons-material/Delete";
import SelectArrayWrapper from "../Global/Select/SelectArrayWrapper";
import Notification from "../Global/Notifications/Notification";
import { getMaterial } from "../Store/Features/Material/materialSlice";

import {
  Typography,
  Grid,
  Button,
  Stack,
  Divider,
  Container,
  Box,
  IconButton,
  InputAdornment,
} from "@mui/material";

function ProductItems({ product, productId, getProduct }) {
  const material = useSelector((state) => state.material.data);
  const dispatch = useDispatch();
  const [notify, setNotify] = useState({
    isOpen: false,
    message: "",
    type: "info",
  });

  useEffect(() => {
    dispatch(getMaterial());
  }, [SelectArrayWrapper]);

  const postItemDelete = (id, e) => {
    let data = { data: productId }; //uloží do správného formátu productId, u kterého mažu daný materiál
    e.preventDefault();
    Axios.delete(`/api/product_item_delete/${id}`, { data: data }) // "data" se pošlou spolu s akcí "delete", aby se v DJangu mohly následně u produktu odečít výrobní náklady
      .then((data) => {
        console.log("Deleted!");
        //console.log("productId", productId);
        console.log("data", data);
        getProduct();
        setNotify({
          isOpen: true,
          message: "Materiál byl odstraněn",
          type: "warning",
        });
      })
      .catch((err) => console.log(err));
  };

  // fce "showUnit" načte "data" příslušného "item", který uživatel zvolil selectem "ItemWrapper"
  // pak přiřadí "data", tedy "id" z načteného API seznamu Items příslučnému "item"
  // nakonec u nalezeného item zobrazí atribut "unit", tedy jednotku přiřazenou danému item
  function showUnit(data) {
    var filtered = Object.fromEntries(
      Object.entries(material).filter(([k, v]) => v.id === data)
    );
    var filteredUnit = Object.keys(filtered).map((key) => (
      <>{filtered[key].unit} </>
    ));
    //console.log("filteredUnit", filteredUnit);
    return <Typography>{filteredUnit}</Typography>;
  }

  const validationSchema = Yup.object({
    item: Yup.string().required("Prosím zadejte položku"),
    quantity: Yup.number()
      .min(0.01)
      .max(1000000)
      .required("Prosím zadejte počet (minimálně 0.01 a maximálně 1 000 000)")
      .typeError(
        "Zadejte prosím číslo ve správném formátu (k oddělení desetinného čísla používejte tečku)"
      ),
  });

  const initialValues = {
    item: "",
    quantity: "",
  };

  const onSubmit = (values) => {
    const { item, quantity } = values;
    //console.log("values: : ", values);
    Axios.patch(`/api/product_item_patch/${productId}`, {
      item,
      quantity,
    })
      .then((res) => {
        console.log("Adding Item ", res);
        getProduct();
      })
      .catch((err) => console.log(err));
  };

  return (
    <>
      <Stack
        sx={{
          marginBottom: "20px",
          marginTop: "10px",
          justifyContent: "center",
          border: "1px solid gray",
          p: "30px",
        }}
        direction={{
          xs: "column",
          md: "row",
        }}
        spacing={2}
        mb={2}
        divider={<Divider orientation="vertical" flexItem />}
      >
        <Container>
          {product?.items.length > 0 ? ( // zkontroluje, zda produkt obsahuje nějaký materiál
            <>
              <Grid item xs={12}>
                <Typography variant="subtitle2">Seznam</Typography>
              </Grid>
              {product?.items.map((item, index) => {
                return (
                  <Box
                    sx={{
                      maxWidth: 300,
                      minHeight: 50,
                      backgroundColor: "primary.dark",
                      textAlign: "left", //zarovnání textu
                      borderRadius: "8px", //zaoblení
                      flexItem: "true",
                      pl: "10px", //odsazení textu vlevo
                      pt: "5px",
                      flexWrap: "wrap", // zalomí položky, pokud by přetékaly okraj
                      //border: 1, //černé okraje
                      mt: 0.5, //mezera pod
                    }}
                    key={index}
                  >
                    <Grid
                      container
                      justifyContent="space-between"
                      alignItems="center"
                    >
                      {" "}
                      <Link
                        to={`/material/${item.item.id}`}
                        style={{ textDecoration: "none" }}
                      >
                        <Box
                          sx={{
                            "&:hover": {
                              backgroundColor: "primary.main",
                              opacity: [0.9, 0.8, 0.7],
                            },
                          }}
                        >
                          <Typography variant="subtitle1" color="whitesmoke">
                            {item.item.name}
                          </Typography>
                          <Typography variant="subtitle2" color="whitesmoke">
                            {item.quantity} {item.item.unit}
                          </Typography>
                        </Box>
                      </Link>
                      <Box
                        sx={{
                          pr: "10px",
                          "&:hover": {
                            backgroundColor: "primary.main",
                            opacity: [0.9, 0.8, 0.7],
                          },
                        }}
                      >
                        <IconButton
                          type="delete"
                          onClick={(e) => postItemDelete(item.id, e)}
                          color="warning"
                        >
                          <DeleteIcon color="warning" />
                        </IconButton>
                      </Box>
                    </Grid>
                  </Box>
                );
              })}
            </>
          ) : (
            <Typography variant="subtitle2">Žádný materiál</Typography>
          )}
        </Container>
        <Container>
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={async (values, { resetForm }) => {
              await onSubmit(values);
              resetForm();
              //navigate('/');
            }}
          >
            {({ isValid, values }) => (
              <Form>
                <Stack
                  //sx={{ justifyContent: "center" }}
                  direction="row"
                  spacing={2}
                >
                  <Grid
                    container
                    spacing={2}
                    alignItems="flex-start"
                    maxWidth="250px"
                  >
                    <Grid item xs={12}>
                      <Typography variant="subtitle2">
                        Přidat obsah produktu
                      </Typography>
                    </Grid>
                    <Grid item xs={12} sx={{ minWidth: "250px" }}>
                      <SelectArrayWrapper
                        name="item"
                        label="Materiál ..."
                        options={material}
                        size="small"
                        required
                      ></SelectArrayWrapper>
                    </Grid>
                    <Grid item>
                      <TextField
                        sx={{ maxWidth: "152px" }}
                        fullWidth
                        id="quantity"
                        name="quantity"
                        label="Množství"
                        variant="standard"
                        helperText="Max. 2 desetinná čísla oddělená tečkou (např. 1.20)"
                        required
                        size="small"
                        InputProps={{
                          endAdornment: (
                            <InputAdornment position="end">
                              {showUnit(values.item)}
                              {/* načte a zobrazí jednotku dle vybrané "item" ze komponenty ItemWrapper */}
                            </InputAdornment>
                          ),
                        }}
                      />
                    </Grid>
                    <Grid item>
                      <Button
                        type="submit"
                        color="success"
                        className="button"
                        variant="contained"
                      >
                        +
                      </Button>
                    </Grid>
                  </Grid>
                </Stack>
              </Form>
            )}
          </Formik>
        </Container>
      </Stack>
      <Notification notify={notify} setNotify={setNotify} />
    </>
  );
}
export default ProductItems;
