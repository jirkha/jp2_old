import React, {useState, useEffect} from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import * as Yup from "yup";
import { Formik, Form, Field } from "formik";
import Axios from 'axios'
import TextField from "../Global/Textfield"

import * as AddButton from '../Material/AddButton';
import SelectArrayWrapper from '../Global/Select/SelectArrayWrapper';
import { useDispatch, useSelector } from "react-redux";
import { getProductType } from '../Store/Features/Products/productTypeSlice';
import { getMaterial } from '../Store/Features/Material/materialSlice';

import { 
  Typography,
  Grid,
  Box,
  Button,
  InputAdornment,
  FormControlLabel,
  Checkbox,
  Alert,
} from "@mui/material";


const UpdateProductForm = () => {

    let { productId } = useParams();
    const dispatch = useDispatch();

const productType = useSelector((state) => state.productType.data)
const material = useSelector((state) => state.material.data)
let [product, setProduct] = useState([])

useEffect(() => {
  dispatch(getProductType());
  dispatch(getMaterial());
  getProduct();
  console.log("productType: ",productType);
  console.log("material: ",material)
}, [productId]);

    let getProduct = async () => {
      let response = await fetch(`/api/product_detail/${productId}`);
      let data = await response.json();
      console.log("načtená data",data.p_ser)
      setProduct(data.p_ser);
    };

  const validationSchema = Yup.object({
    name: Yup.string().required("Prosím zadejte název produktu"),//.oneOf(itemType),
    product_type: Yup.string().required("Prosím vyberte typ produktu"),
    //items: Yup.array().min(1).required("Vyberte prosím alespoň jednu položku"),
    price: Yup.number().min(0).max(1000000).required("Prosím zadejte prodejní cenu produktu (minimálně 0 a maximálně 1 000 000 Kč)"),
    made: Yup.number().min(0).max(1000000),
    procedure: Yup.string(),
    brand: Yup.bool(), //JPcandles A/N
    note: Yup.string()
  });

  const initialValues = {
    name: product?.name ?? "",
    product_type: "", // product?.product_type.id ?? "",
    //items: [],
    price: product?.price ?? "",
    made: product?.made ?? "",
    procedure: product?.procedure ?? "",
    brand: product?.brand ?? true,
    note: product?.note ?? ""
  };

  const navigate = useNavigate();

  const onSubmit = (values) => {
    const { 
        name,
        product_type,
        //items,
        price,
        made,
        procedure,
        brand,
        note
    } = values;
    console.log("values: : ", values);
    Axios.put(`/api/product_update/${productId}`, {
        name,
        product_type,
        //items,
        price,
        made,
        procedure,
        brand,
        note
    })
    .then(res => {
        console.log("Updating Product: ", res);
        //dispatch(getProduct()); //aktualizuje seznam produktů
        navigate(`/product_detail/${productId}/`)
    }).catch(err => console.log(err))
  }


  return (
    <div>
            <Alert
          variant="outlined"
          severity="info"
          sx={{marginTop: "10px", marginBottom: "20px"}}
          action={
            <Button color="inherit" size="small" href={`/product_detail/${productId}/`}>
              zpět
            </Button>
          }
        >
          Pokud chcete upravit materiál obsažený v produktu (např. vosk ve svíčce), vraťte se prosím zpět na stránku
          s detailem produktu
        </Alert>
        <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      enableReinitialize={true}
      onSubmit={async (values, { resetForm }) => {
        await onSubmit(values);
        resetForm();
        //navigate('/');
      }}
    >
      {({ isValid }) => (
      <Form>
        <Box sx={{  flexWrap: "wrap", }}>
        <Grid 
          container 
          spacing={2}
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
                >Povinné údaje
              </Typography>
              <TextField id="name" name="name" label="Název" variant="outlined" required />
            </Grid>
            <Grid item xs={10}>
               <SelectArrayWrapper
                name="product_type"
                // size="small"
                label="Typ produktu ..."
                options={productType}
                required
              > 
                </SelectArrayWrapper>              
            </Grid>
            <Grid item xs={2}>
              <AddButton.AddButton fontSize="large" color="success" link="productTypeForm" />              
            </Grid>
           
            <Grid item xs={6}>
              <TextField 
                id="price" 
                name="price" 
                // size="small"
                label="Prodejní cena produktu"
                helperText="Zadejte celé číslo (bez haléřů)"
                InputProps={{
                  endAdornment: <InputAdornment position='end'>Kč</InputAdornment>
                }}
                required variant="outlined" />
            </Grid>
            <Grid item xs={6}>
               <TextField 
                name="made" 
                // size="small"
                label="Vyrobené množství" 
                InputProps={{
                  endAdornment: <InputAdornment position='end'>ks</InputAdornment>
                }}
                required variant="outlined" />
            </Grid>
         
            <Grid item xs={12}>
              <Typography
                variant="subtitle2"
                //color="textPrimary"
                //align="center" //zarovná doprostřed
                gutterBottom //vytvoří mezeru pod textem
                >Nepovinné údaje
              </Typography>
              <TextField id="procedure" name="procedure" multiline rows={8} label="Výrobní postup" variant="outlined" />
            </Grid>
            <Grid item xs={12}>
              <TextField id="note" name="note" label="Poznámka" multiline rows={6} variant="outlined" />
            </Grid>

            <Grid item xs={3}>
               <Button 
                type="submit" 
                className="button"
                variant="contained"
                >
                Uložit
                </Button>            
            </Grid>
             <Grid item xs={9}>
              <Field
              as={FormControlLabel}
              type="checkbox"
              name="brand"
              control={<Checkbox />}
              label="Produkt pod značkou J&P"
            />
        </Grid>
        </Grid>
        </Box>
      </Form>
      
      )}
    </Formik>
    </div>
  );
};
export default UpdateProductForm