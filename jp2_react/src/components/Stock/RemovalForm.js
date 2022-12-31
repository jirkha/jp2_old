import React, { useEffect, useState } from "react";
import * as Yup from "yup";
import { Formik, Form } from "formik";
import Axios from "axios";
import TextField from "../Global/Textfield";
import DateTimePicker from "../Global/DateTimePicker/DateTimePicker";
import Notification from "../Global/Notifications/Notification";

import ItemWrapper from "../Global/Select/ItemWrapper";
import { useDispatch, useSelector } from "react-redux";
import { getRemoval } from "../Store/Features/Material/removalSlice";
import { getMaterial } from "../Store/Features/Material/materialSlice";

import {
  Typography,
  Grid,
  Box,
  Button,
  InputAdornment,
} from "@mui/material";
import { ShowValue } from "../Global/Utils/showValue";

const RemovalForm = (props) => {
  const dispatch = useDispatch();
  const item = useSelector((state) => state.material.data);
  const { setOpenPopup } = props;
  const [notify, setNotify] = useState({ isOpen: false, message: "", type: "" });

  useEffect(() => {
    dispatch(getMaterial());
  }, []);

  const handleClose = () => {
    setOpenPopup(false);
  };

  const validationSchema = Yup.object({
    day_of_removal: "",
    item: Yup.string().required("Prosím vyberte materiál"),
    quantity_of_material: Yup.number()
      .min(1)
      .max(1000000)
      .required(
        "Prosím zadejte vyskladněné množství ( celé číslo - minimálně 1 a maximálně 1 000 000)"
      ),
    note: Yup.string(),
  });

  const initialValues = {
    day_of_removal: "",
    item: "",
    quantity_of_material: "",
    note: "",
  };

  const onSubmit = (values) => {
    const { day_of_removal, item, quantity_of_material, note } = values;
    Axios.post("/api/removal_add/", {
      day_of_removal,
      item,
      quantity_of_material,
      note,
    })
      .then((res) => {
        console.log("Adding Removal: ", res);
        setNotify({
          isOpen: true,
          message: "Vyskladnění bylo úspěšné",
          type: "success",
        });
        dispatch(getRemoval());
      })
      .catch((err) => {
        console.log(err.response.data);
        setNotify({
          isOpen: true,
          message: err.response.data,
          type: "error",
        });
      });
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
                    id="day_of_removal"
                    name="day_of_removal"
                    label="Datum vyskladnění"
                    variant="outlined"
                    required
                  />
                </Grid>
                <Grid item xs={12}>
                  <ItemWrapper
                    name="item"
                    // size="small"
                    label="Materiál ..."
                    //options={productOptions}
                    required
                  ></ItemWrapper>
                </Grid>
                {values.item && (
                  <Grid item xs={12}>
                    <Typography color="primary">
                      Na skladu aktuálně{" "}
                      <ShowValue
                        object={item}
                        data={values.item}
                        value="quantity_of_material"
                      />{" "}
                      <ShowValue
                        object={item}
                        data={values.item}
                        value="unit"
                      />
                    </Typography>
                  </Grid>
                )}
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
                          <ShowValue
                            object={item}
                            data={values.item}
                            value="unit"
                          />
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
        )}
      </Formik>
      <Notification notify={notify} setNotify={setNotify} />
    </>
  );
};
export default RemovalForm;
