import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { Formik, Form } from "formik";
import Axios from "axios";
import TextField from "../Global/Textfield";
import DateTimePicker from "../Global/DateTimePicker/DateTimePicker";

import * as AddButton from "../Material/AddButton";
import ItemWrapper from "../Global/Select/ItemWrapper";
import { useDispatch, useSelector } from "react-redux";
import { getStorage } from "../Store/Features/Material/storageSlice";
import { getMaterial } from "../Store/Features/Material/materialSlice";

import {
  Typography,
  Grid,
  Box,
  Button,
  InputAdornment,
} from "@mui/material";
import { ShowValue } from "../Global/Utils/showValue";


const StorageForm = (props) => {
  const dispatch = useDispatch();
  const item = useSelector((state) => state.material.data)
  const { setOpenPopup } = props;

useEffect(() => {
  dispatch(getMaterial());
}, []);

  const handleClose = () => {
    setOpenPopup(false);
  };

  const validationSchema = Yup.object({
    day_of_storage: "",
    item: Yup.string().required("Prosím vyberte materiál"),
    quantity_of_material: Yup.number()
      .min(1)
      .max(1000000)
      .required(
        "Prosím zadejte naskladněné množství ( celé číslo - minimálně 1 a maximálně 1 000 000)"
      ),
    note: Yup.string(),
  });

  const initialValues = {
    day_of_storage: "",
    item: "",
    quantity_of_material: "",
    note: "",
  };

  const navigate = useNavigate();

  const onSubmit = (values) => {
    const { day_of_storage, item, quantity_of_material, note } = values;
    console.log("storage: ", values);
    Axios.post("/api/storage_add/", {
      day_of_storage,
      item,
      quantity_of_material,
      note,
    })
      .then((res) => {
        console.log("Adding Storage: ", res);
        console.log("item: ", res.day_of_storage);
        dispatch(getStorage());
        //navigate("/material");
      })
      .catch((err) => console.log(err));
  };

  return (
    <>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        //enableReinitialize={true}
        onSubmit={async (values, { resetForm }) => {
          await onSubmit(values);
          resetForm();
          //navigate("/");
        }}
      >
        {({ isValid, values }) => (
          //console.log("values", values),
          (
            <Form>
              <Box sx={{ flexWrap: "wrap" }}>
                <Grid
                  container
                  spacing={2}
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
                    <DateTimePicker
                      id="day_of_storage"
                      name="day_of_storage"
                      label="Datum naskladnění"
                      variant="outlined"
                      required
                    />
                  </Grid>
                  <Grid item xs={10}>
                    <ItemWrapper
                      name="item"
                      // size="small"
                      label="Materiál ..."
                      //options={productOptions}
                      required
                    ></ItemWrapper>
                  </Grid>
                  <Grid item xs={2}>
                    <AddButton.AddButton
                      fontSize="large"
                      color="success"
                      link="/material#itemForm"
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      id="quantity_of_material"
                      name="quantity_of_material"
                      // size="small"
                      label="Množství materiálu"
                      helperText="Zadejte prosím pouze celé číslo"
                      required
                      variant="outlined"
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="end">
                            <ShowValue object={item} data={values.item} value="unit" />
                            {/* načte a zobrazí jednotku dle vybrané "item" ze komponenty ItemWrapper */}
                          </InputAdornment>
                        ),
                      }}
                      //ukáže měrnou jednotku příslušné "item" (ks/kg atd.)
                    />
                  </Grid>

                  <Grid item xs={12}>
                    <Typography
                      variant="subtitle2"
                      //color="textPrimary"
                      //align="center" //zarovná doprostřed
                      gutterBottom //vytvoří mezeru pod textem
                    >
                      Nepovinné údaje
                    </Typography>
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      id="note"
                      name="note"
                      label="Poznámka"
                      multiline
                      rows={4}
                      variant="outlined"
                    />
                  </Grid>

                  <Grid item xs={12}>
                    <Button
                      type="submit"
                      className="button"
                      variant="contained"
                      onClick={handleClose}
                    >
                      Přidat
                    </Button>
                  </Grid>
                </Grid>
              </Box>
            </Form>
          )
        )}
      </Formik>
    </>
  );
};
export default StorageForm;
