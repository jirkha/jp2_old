import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import * as Yup from "yup";
import { Formik, Form } from "formik";
import Axios from 'axios'
import TextField from "../Global/Textfield"
import Notification from '../Global/Notifications/Notification';
import { useDispatch, useSelector } from "react-redux";
import { getSale } from '../Store/Features/Products/saleSlice';
import { getSaleType } from "../Store/Features/Products/saleTypeSlice";

import { 
  Typography,
  Grid,
  Button,
  Stack
} from "@mui/material";


const AddSaleTypeForm = (props) => {

  const dispatch = useDispatch();
  //const saleType = useSelector((state) => state.saleType.data)
  const [notify, setNotify] = useState({isOpen: false, message: '', type: ''})
  const saleTypeObj = props.saleTypeObj || undefined
  const { handleClose } = props;

  useEffect(() => {
    dispatch(getSaleType());
  }, []);

  const validationSchema = Yup.object({
    name: Yup.string().required("Prosím zadejte název")
  });

  const initialValues = {
    name: saleTypeObj?.name ?? ""
  };

  const navigate = useNavigate();

  const onSubmit = (values) => {
    const { name
    } = values;
    //console.log("values: : ", values);

    if (saleTypeObj) {
      Axios.put(`/api/saleType_update/${saleTypeObj.id}/`, {
        name
    })
    .then(res => {
        console.log("Updating SaleType: ", res);
        dispatch(getSaleType());
        dispatch(getSale());
        setNotify({
                  isOpen: true,
                  message: 'Druh prodejního kanálu byl úspěšně upraven',
                  type: 'success'
                })
    }).catch(err => console.log(err))
    }

    else {
      Axios.post('/api/saleType_add/', {
        name
    })
    .then(res => {
        console.log("Adding SaleType: ", res);
        dispatch(getSaleType());
        setNotify({
              isOpen: true,
              message: 'Druh prodejního kanálu byl úspěšně vložen',
              type: 'success'
            })
    }).catch(err => console.log(err))
    }
    
  }

  return (
    <>
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={async (values, { resetForm }) => {
        await onSubmit(values);
        resetForm();
        //navigate('/');
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
            {saleTypeObj ? "Změnit" : "Přidat"}
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
export default AddSaleTypeForm