import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { Formik, Form, Field } from "formik";
import Axios from "axios";
import TextField from "../Global/Textfield";
import Notification from "../Global/Notifications/Notification";
import { Popup2 } from "../Global/Other/Popup2";

import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import SelectArrayWrapper from "../Global/Select/SelectArrayWrapper";
import { useDispatch, useSelector } from "react-redux";
import { getSale } from "../Store/Features/Products/saleSlice";
import { getSaleType } from "../Store/Features/Products/saleTypeSlice";

import {
  Typography,
  Grid,
  Box,
  Button,
  FormControlLabel,
  Checkbox,
  FormControl,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import AddSaleTypeForm from "./AddSaleTypeForm";
import GooglePlaces from "../Global/Select/GooglePlaces";

const AddSaleForm = (props) => {
  const dispatch = useDispatch();

  const saleType = useSelector((state) => state.saleType.data);
  const [notify, setNotify] = useState({
    isOpen: false,
    message: "",
    type: "",
  });
  const editedSale = props.editedSale;
  const [listAdress, setListAdress] = useState("");
  const { setOpenPopup, getThisSale } = props;
  const [openPopup2, setOpenPopup2] = useState(false);

  useEffect(() => {
    dispatch(getSaleType());
    console.log("saleType: ", saleType);
  }, [SelectArrayWrapper]);


  const handleClose = () => {
    setOpenPopup2(false);
  };
  const re =
    /^((ftp|http|https):\/\/)?(www.)?(?!.*(ftp|http|https|www.))[a-zA-Z0-9_-]+(\.[a-zA-Z]+)+((\/)[\w#]+)*(\/\w+\?[a-zA-Z0-9_]+=\w+(&[a-zA-Z0-9_]+=\w+)*)?$/gm;

  const validationSchema = Yup.object({
    name: Yup.string().required("Prosím zadejte název prodejního kanálu"), //.oneOf(itemType),
    type: Yup.string().required("Prosím vyberte typ prodejního kanálu"),
    route: Yup.string(),
    street_number: Yup.string(),
    city: Yup.string(),
    country: Yup.string(),
    postal_code: Yup.number().min(10000).max(99999),
    ic_number: Yup.number().min(10000).max(99999999),
    link: Yup.string().matches(re, "Zadejte prosím platný odkaz"),
    brand: Yup.bool(), //JPcandles A/N
    note: Yup.string(),
  });

  const initialValues = {
    name: editedSale?.name ?? "",
    type: editedSale?.type?.id ?? "",
    route: editedSale?.route ?? listAdress["route"] ?? "",
    street_number:
      editedSale?.street_number ?? listAdress["street_number"] ?? "",
    city:
      editedSale?.city ??
      listAdress["sublocality_level_1"] ??
      listAdress["locality"] ??
      "",
    country: editedSale?.country ?? listAdress["country"] ?? "",
    postal_code: editedSale?.postal_code ?? listAdress["postalCode"] ?? "",
    ic_number: editedSale?.ic_number ?? "",
    link: editedSale?.link ?? "",
    brand: editedSale?.brand ?? true,
    note: editedSale?.note ?? "",
  };

  const navigate = useNavigate();

  const onSubmit = (values) => {
    const {
      name,
      type,
      brand,
      note,
      route,
      street_number,
      city,
      country,
      postal_code,
      ic_number,
      link,
    } = values;
    console.log("values: : ", values);

    if (editedSale) {
      Axios.put(`/api/sale_update/${editedSale.id}/`, {
        name,
        type,
        brand,
        note,
        route,
        street_number,
        city,
        country,
        postal_code,
        ic_number,
        link,
      })
        .then((res) => {
          console.log("Updating Sale: ", res);
          dispatch(getSale()); //aktualizuje seznam prodejních kanálů
          getThisSale(); // aktualizuje prodejní kanál (při editeaci z detailu prod.kanálu)
          setNotify({
            isOpen: true,
            message: "Prodejní kanál byl úspěšně upraven",
            type: "info",
          });
        })
        .catch((err) => console.log(err));
    } else {
      Axios.post("/api/sale_add/", {
        name,
        type,
        brand,
        note,
        route,
        street_number,
        city,
        country,
        postal_code,
        ic_number,
        link,
      })
        .then((res) => {
          console.log("Adding Sale: ", res);
          dispatch(getSale()); //aktualizuje seznam prodejních kanálů
          setNotify({
            isOpen: true,
            message: "Prodejní kanál byl úspěšně uložen",
            type: "info",
          });
        })
        .catch((err) => console.log(err));
    }
  };

  return (
    <>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        enableReinitialize
        onSubmit={async (values, { resetForm }) => {
          await onSubmit(values);
          resetForm();
          //navigate('/');
        }}
      >
        {({ isValid }) => (
          <Form>
            <Box sx={{ flexWrap: "wrap" }}>
              <Grid
                container
                spacing={1}
                // justifyContent="center"
                //direction="column"
                maxWidth="430px"
                alignItems="flex-start"
              >
                <Grid item xs={12}>
                  <Typography
                    variant="subtitle2"
                    //color="textPrimary"
                    //align="center" //zarovná doprostřed
                    gutterBottom //vytvoří mezeru pod textem
                  >
                    Povinné údaje
                  </Typography>
                  <TextField
                    name="name"
                    label="Název"
                    variant="outlined"
                    required
                  />
                </Grid>
                <Grid item xs={10}>
                  <SelectArrayWrapper
                    //id="unit"
                    name="type"
                    label="Druh prodejního kanálu"
                    options={saleType}
                    required
                  ></SelectArrayWrapper>
                </Grid>
                <Grid item xs={2}>
                  <Button
                    sx={{ height: "55px", maxWidth: "10px" }}
                    variant="outlined"
                    size="inherit"
                    color="primary"
                    onClick={() => setOpenPopup2(true)}
                  >
                    <AddOutlinedIcon />
                  </Button>
                </Grid>
                <Grid item xs={12} sx={{ mb: 1 }}>
                  <Accordion>
                    <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                      <Typography>Poznámka</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                      <Typography
                        variant="subtitle2"
                        //color="textPrimary"
                        //align="center" //zarovná doprostřed
                        gutterBottom //vytvoří mezeru pod textem
                      >
                        Nepovinné údaje
                      </Typography>

                      <Grid item xs={12}>
                        <TextField
                          id="note"
                          name="note"
                          label="Poznámka"
                          multiline
                          rows={3}
                          variant="outlined"
                        />
                      </Grid>
                    </AccordionDetails>
                  </Accordion>
                </Grid>
                <Grid item xs={12}>
                  <Typography
                    variant="subtitle2"
                    //color="textPrimary"
                    //align="center" //zarovná doprostřed
                    gutterBottom //vytvoří mezeru pod textem
                  >
                    Údaje pro fakturaci
                  </Typography>
                </Grid>

                <Grid item xs={12}>
                  <GooglePlaces
                    listAdress={listAdress}
                    setListAdress={setListAdress}
                  />
                </Grid>
                <Grid item xs={8}>
                  <TextField name="route" label="Ulice" variant="outlined" />
                </Grid>
                <Grid item xs={4}>
                  <TextField
                    name="street_number"
                    label="Číslo popisné/orientační"
                    variant="outlined"
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField name="city" label="Město" variant="outlined" />
                </Grid>
                <Grid item xs={6}>
                  <TextField name="country" label="Země" variant="outlined" />
                </Grid>
                <Grid item xs={3}>
                  <TextField
                    name="postal_code"
                    label="PSČ"
                    variant="outlined"
                  />
                </Grid>
                <Grid item xs={4}>
                  <TextField name="ic_number" label="IČ" variant="outlined" />
                </Grid>
                <Grid item xs={5}>
                  <TextField name="link" label="Web" variant="outlined" />
                </Grid>

                <Grid item xs={3}>
                  {/* <Link to="#itemList"> */}
                  <Button
                    type="submit"
                    className="button"
                    variant="contained"
                    onClick={() => isValid && setOpenPopup(false)}
                  >
                    {editedSale ? "Změnit" : "Přidat"}
                  </Button>
                  {/* </Link> */}
                </Grid>
                <Grid item xs={9}>
                  <Field
                    as={FormControlLabel}
                    type="checkbox"
                    name="brand"
                    control={<Checkbox />}
                    label="Prodejní kanál pod značkou J&P"
                  />
                </Grid>
              </Grid>
            </Box>
          </Form>
        )}
      </Formik>
      <Popup2
        title="Vložení druhu prodejního kanálu"
        openPopup2={openPopup2}
        setOpenPopup2={setOpenPopup2}
      >
        <AddSaleTypeForm handleClose={handleClose} />
      </Popup2>
      <Notification notify={notify} setNotify={setNotify} />
    </>
  );
};
export default AddSaleForm;
