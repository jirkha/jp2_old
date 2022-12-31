import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import * as Yup from "yup";
import { Formik, Form } from "formik";
import Axios from 'axios'
import TextField from "../Global/Textfield"
import Notification from '../Global/Notifications/Notification';
import { useDispatch } from "react-redux";
import { getProduct } from '../Store/Features/Products/productSlice';
import { getProductType } from "../Store/Features/Products/productTypeSlice";

import { 
  Typography,
  Grid,
  Button,
  Stack
} from "@mui/material";


const AddProductTypeForm = (props) => {

  const dispatch = useDispatch();
  //const productType = useSelector((state) => state.productType.data)
  const [notify, setNotify] = useState({isOpen: false, message: '', type: ''})
  const productTypeObj = props.productTypeObj || undefined
  const { handleClose } = props;

   useEffect(() => {
    dispatch(getProductType());
  }, []);

  const validationSchema = Yup.object({
    name: Yup.string().required("Prosím zadejte název")
  });

  const initialValues = {
    name: productTypeObj?.name ?? ""
  };

  const navigate = useNavigate();

  const onSubmit = (values) => {
    const { name
    } = values;
    //console.log("values: : ", values);

    {if (productTypeObj)
    {
      Axios.put(`/api/productType_update/${productTypeObj.id}/`, {
                name,
            })
            .then(res => {
                console.log("Updating Product", res);
                //console.log("type: ",res.data.type);
                dispatch(getProductType());
                dispatch(getProduct()); //aktualizuje seznam materiálu, aby se aktualizovalo pole typ materiálu
                setNotify({
                  isOpen: true,
                  message: 'Druh produktu byl úspěšně upraven',
                  type: 'success'
                })
            }).catch(err => console.log(err))
    }

    else {
    Axios.post('/api/productType_add/', {
            name
        })
        .then(res => {
            console.log("Adding ProductType: ", res);
            // console.log("productType: ",res.data);
            dispatch(getProductType());
            setNotify({
              isOpen: true,
              message: 'Nový druh produktu byl úspěšně vložen',
              type: 'success'
            })
        }).catch(err => console.log(err))
    }}
  }

  return (
    <>
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={async (values, { resetForm }) => {
        await onSubmit(values);
        resetForm();
      }}
    >
      {({ isValid }) => (
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
            <Grid item xs={12}>
              <Typography
                variant="subtitle2"
                >Povinný údaj
              </Typography>
              </Grid>
               <Grid item xs={12}>
              <TextField fullWidth id="name" name="name" label="Název" variant="outlined" required />
            </Grid>
            <Grid item xs={12}>
            <Button 
              type="submit" 
              className="button"
              variant="contained"
              onClick={handleClose}
              >
            {productTypeObj ? "Změnit" : "Přidat"}
            </Button> 
            </Grid>
        </Grid>
        </Stack>
      </Form>
      )}
    </Formik>
    <Notification
      notify={notify}
      setNotify={setNotify}
      />
    </>
  );
};
export default AddProductTypeForm