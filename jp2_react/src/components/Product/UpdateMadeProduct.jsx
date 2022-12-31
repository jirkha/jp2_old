import React from 'react'
import { useNavigate } from 'react-router-dom';
import * as Yup from "yup";
import { Formik, Form } from "formik";
import Axios from 'axios'
import TextField from "../Global/Textfield"

import { 
  Typography,
  Grid,
  Button,
  Stack
} from "@mui/material";
import SelectWrapper from '../Global/Select/SelectWrapper';


function UpdateMadeProduct (props) {
  
  const { getProduct, setOpenPopup } = props;

  const validationSchema = Yup.object({
    variant: Yup.string().required("Prosím zadejte název"),
    made: Yup.number()
      .min(1)
      .max(1000000)
      .required(
        "Prosím zadejte počet (minimálně 1 a maximálně 1 000 000)"
      )
      .typeError(
        "Zadejte prosím číslo ve správném formátu"
      ),
  });

  const initialValues = {
    variant: "+",
    made: ""
  };

  const navigate = useNavigate();

  const onSubmit = (values) => {
    const { variant, made
    } = values;
    //console.log("values", values);
    Axios.patch(`/api/product_made_patch/${props.id}`, {
        variant, made
    })
    .then(res => {
        console.log("Adding maded Products: ", res);
        getProduct()
        //navigate(`/product_detail/${props.id}`)
    }).catch(err => console.log(err))
  }

  const changeVariant = {
    "+": "Přidat",
    "-": "Odebrat",
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={async (values, { resetForm }) => {
        await onSubmit(values);
        resetForm();
        //navigate(`/product_detail/${props.id}`)
      }}
    >
      {({ isValid, values }) => (
      <Form>
          <Stack
        sx={{ justifyContent: "center" }}
        direction="row"
        spacing={2}
      >
        <Grid 
          container 
          spacing={2}
          alignItems="center"
          maxWidth="550px"
          >
            <Grid item xs={4}>
               <SelectWrapper
                name="variant"
                size="small"
                label="Druh"
                options={changeVariant}
                required
              > 
                </SelectWrapper>              
            </Grid>
            <Grid item xs={4}>
              <TextField fullWidth size="small" name="made" label="Počet" variant="outlined" required />
            </Grid>
            <Grid item xs={4}>
            <Button 
              type="submit" 
              className="button"
              variant="contained"
              onClick={() => setOpenPopup(false)}
              >
            Upravit
            </Button> 
            </Grid>
        </Grid>
        </Stack> 
        <Typography sx={{ mt: 2 }} variant="body2">
          {values.variant === "+" ? 
          "Zadaný počet bude přičten k současnému počtu naskladněných výrobků" : 
          "Zadaný počet bude odečten od současného počtu naskladněných výrobků"}
        </Typography>
      </Form>
      )}
    </Formik>
  );
};
export default UpdateMadeProduct