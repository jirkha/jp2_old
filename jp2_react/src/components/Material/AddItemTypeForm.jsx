import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import * as Yup from "yup";
import { Formik, Form } from "formik";
import Axios from 'axios'
import TextField from "../Global/Textfield"
import { useDispatch, useSelector } from "react-redux";
import {getMaterialType} from "../Store/Features/Material/materialTypeSlice"
import {getMaterial} from "../Store/Features/Material/materialSlice"

import { 
  Typography,
  Grid,
  Button,
  Stack
} from "@mui/material";
import Notification from '../Global/Notifications/Notification';


const AddItemTypeForm = (props) => {

  const dispatch = useDispatch();
  const materialType = useSelector((state) => state.materialType.data)
  const [notify, setNotify] = useState({isOpen: false, message: '', type: ''})
  const materialTypeObj = props.materialTypeObj
  const { handleClose } = props;

   useEffect(() => {
    dispatch(getMaterialType());
    // console.log("materialTypeObj",materialTypeObj)
    // console.log("materialType",materialType)
  }, []);

  const validationSchema = Yup.object({
    name: Yup.string().required("Prosím zadejte název"),
    note: Yup.string()
  });

  const initialValues = {
    name: materialTypeObj?.name ?? "",
    note: materialTypeObj?.note ?? "",
  };

  const navigate = useNavigate();

  const onSubmit = (values) => {
    const { name, note
    } = values;
    //console.log("values: : ", values);
    {
      //if (materialTypeObj !== "") {
      if (materialTypeObj ) {
        Axios.put(`/api/itemType_update/${materialTypeObj.id}/`, {
                name,
                note
            })
            .then(res => {
                console.log("Updating Item", res);
                //console.log("type: ",res.data.type);
                dispatch(getMaterialType());
                dispatch(getMaterial()); //aktualizuje seznam materiálu, aby se aktualizovalo pole typ materiálu
                setNotify({
                  isOpen: true,
                  message: 'Typ materiálu byl úspěšně upraven',
                  type: 'success'
                })
            }).catch(err => console.log(err))
      }

      else {
        Axios.post('/api/itemType_add/', {
        name, note })
    .then(res => {
        console.log("Adding ItemType", res);
        //console.log("itemType: ",res.data.type);
        dispatch(getMaterialType());
        setNotify({
                  isOpen: true,
                  message: 'Nový druh materiálu byl úspěšně vložen',
                  type: 'success'
                })
    }).catch(err => console.log(err))
      }}}


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
              <Typography
                variant="subtitle2"
                >Nepovinný údaj
              </Typography>
              </Grid>
             <Grid item xs={12}>
              <TextField name="note" label="Popis" multiline rows={6} variant="outlined" />
            </Grid>
            <Grid item xs={12}>
            {materialTypeObj?.id ?
            <Button 
              type="submit" 
              className="button"
              variant="contained"
              onClick={handleClose}
              >
            Změnit
            </Button>
               :
            <Button 
              type="submit" 
              className="button"
              variant="contained"
              onClick={handleClose}
              >
            Přidat
            </Button>
             }
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
export default AddItemTypeForm