import React, {useState, useEffect } from 'react'
import { Formik, Form } from "formik";
import Axios from 'axios'

import SelectArrayWrapper from "../Select/SelectArrayWrapper"

import { 
  Typography,
  Box,
} from "@mui/material";

const YearPicker = (props) => {

    const [dataYear, setDataYear] = useState("")
    const [initialValues, setInitialValues] = useState({day_of_sale__year: ""});
    const {setDataMonth} = props;
    
    const handleOnChange = (event) => {
        //console.log("handleOnChange", event);
        const found = dataYear.find(element => element.id === event);
        console.log("fromEntries", found.name);
        Axios.post('/api/monthly_sales/', {
        day_of_sale__year: found.name,
    })
    .then(res => {
        console.log("Filtering", res.data[0].months);
        setDataMonth(res.data[0].months)
    }).catch((err) => {
        console.log(err.response);
      })

    };

      // useEffect(() => {
      //   setInitialValues({day_of_sale__year: dataYear[0]?.id});
      // }, []);


      useEffect(() => {
      console.log("props.dataYear",props.dataYear);
      setDataYear(props.dataYear)
      setInitialValues({day_of_sale__year: dataYear[0]?.id})
      }, [props.dataYear]);

  // const initialValues = {
  //   day_of_sale__year: props.dataYear[0].id,
  // };

  // const onSubmit = (values) => {
  //   //console.log("CurrentPrice")
  //   const { 
  //       day_of_sale,
  //       sales_channel,
  //       product,
  //       discount_increase,
  //       quantity_of_product,
  //       difference_price,
  //       price_variant,
  //       brand,
  //       note
  //   } = values;
  //   //console.log("values: : ", values);

   
  return (
    <>
    <Formik
      initialValues={initialValues}
      //validationSchema={validationSchema}
      enableReinitialize={true}
      // onSubmit={async (values, { resetForm }) => {
      //   await onSubmit(values);
      //   resetForm();
      //   //navigate('/');
      // }}
    >
      {({ isValid, values }) => (
      <Form>
        <Box sx={{  flexWrap: "wrap", mb: 2 }}>
        
            <SelectArrayWrapper
                name="day_of_sale__year"
                // size="small"
                label="Vyberte rok ..."
                options={dataYear}
                handleOnChange={handleOnChange}
                setDataMonth={setDataMonth}
                required
                > 
            </SelectArrayWrapper>              
        </Box>
      </Form>
      
      )}
    </Formik>
   
    </>
  );
};
export default YearPicker