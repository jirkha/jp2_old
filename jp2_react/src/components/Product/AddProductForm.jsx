import React, {useState, useEffect} from 'react'
import { useNavigate } from 'react-router-dom';
import * as Yup from "yup";
import { Formik, Form, Field } from "formik";
import Axios from 'axios'
import TextField from "../Global/Textfield"
import Notification from '../Global/Notifications/Notification';
import { Popup2 } from "../Global/Other/Popup2";
import { useConfirm } from "material-ui-confirm";

import AddOutlinedIcon from '@mui/icons-material/AddOutlined';
import SelectArrayWrapper from '../Global/Select/SelectArrayWrapper';
import { useDispatch, useSelector } from "react-redux";
import { getProductType } from '../Store/Features/Products/productTypeSlice';
import { getProduct } from '../Store/Features/Products/productSlice';
import AddProductTypeForm from "./AddProductTypeForm"

import { 
  Typography,
  Grid,
  Box,
  Button,
  InputAdornment,
  FormControlLabel,
  Checkbox,
} from "@mui/material";



const AddProductForm = (props) => {

  const dispatch = useDispatch();
  const confirm = useConfirm();

  const productType = useSelector((state) => state.productType.data)
  const [notify, setNotify] = useState({isOpen: false, message: '', type: ''})
  const editedProduct = props.editedProduct
  const { setOpenPopup, getThisProduct } = props;
  const [openPopup2, setOpenPopup2] = useState(false);

  useEffect(() => {
    dispatch(getProductType());
  }, [SelectArrayWrapper]);

  const handleTypeClose = () => {
    setOpenPopup2(false);
  };

  const handleClose = () => {
    setOpenPopup(false);
  };

  // editedProduct && console.log("editedProduct",editedProduct)

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
    name: editedProduct?.name ?? "",
    product_type: editedProduct?.product_type.id ?? "",
    //image: "",
    image: editedProduct?.image ?? "",
    items: [],
    price: editedProduct?.price ?? 0,
    made: editedProduct?.made ?? 0,
    procedure: editedProduct?.procedure ?? "",
    brand: editedProduct?.brand ?? true,
    note: editedProduct?.note ?? ""
  };

  const navigate = useNavigate();

  const onSubmit = (values) => {

    let formdata = new FormData()
    formdata.append("image",values.image)
    formdata.append("name",values.name)
    formdata.append("product_type",values.product_type)
    formdata.append("price",values.price)
    formdata.append("made",values.made)
    formdata.append("procedure",values.procedure)
    formdata.append("brand",values.brand)
    formdata.append("note",values.note)
    
    // console.log("formdata",formdata)
    // console.log("values", values);

    if (editedProduct) {
    Axios.put(`/api/posts/${editedProduct.id}/`, 
      formdata, {
      headers: {
        "content-type": "multipart/form-data",
      },
    })
      .then((res) => {
        console.log("Updating Product: ", res);
        //dispatch(getProduct()); //aktualizuje seznam produktů
        getThisProduct(); // aktualizuje detail produktu (při otevření editace ze strany s detailem produktu)
        confirm({
          //title: `Opravdu chtete vymazat položku ${type.name}?`,
          title: "Chcete upravit materiál obsažený v produktu?",
          titleProps: {
            color: "text.primary",
            fontSize: 20,
            fontWeight: "light",
          },
          confirmationText: "Ano",
          cancellationText: "Ne",
          cancellationButtonProps: { variant: "outlined" },
          confirmationButtonProps: { variant: "outlined" },
        })
          .then(() => {
            //setOpenPopup(false);
            navigate(`/product_detail/${res.data.id}`, {
              state: {
                data: "items",
              },
            }); //přesměruje na detail vytvořeného produktu a otevře okno s úpravou materiálu
          })
          .catch(() => {
            console.log("Action cancelled.");
            navigate(`/product_detail/${res.data.id}`);
            setNotify({
              isOpen: true,
              message: "Materiál můžete vložit kdykoliv později",
              type: "info",
            });
          });
      })
      .catch((err) => console.log("chyba", err));
  }

  else {
    Axios.post('/api/posts/', formdata, {
            headers: {
                'content-type': 'multipart/form-data'
            }}, )
    .then(res => {
        console.log("Adding Product: ", res);
        //console.log("product ID: ", res.data.id);
        //dispatch(getProduct()); //aktualizuje seznam produktů
        confirm({
          //title: `Opravdu chtete vymazat položku ${type.name}?`,
          title: "Chcete vložit materiál obsažený v produktu?",
          titleProps: {
            color: "text.primary",
            fontSize: 20,
            fontWeight: "light",
          },
          confirmationText: "Ano",
          cancellationText: "Ne",
          cancellationButtonProps: { variant: "outlined" },
          confirmationButtonProps: { variant: "outlined" },
        })
          .then(() => {
            //setOpenPopup(false);
            navigate(`/product_detail/${res.data.id}`, {
              state: {
                data: "items",
              },
            }); //přesměruje na detail vytvořeného produktu a otevře okno s úpravou materiálu
          })
          .catch(() => {
            console.log("Action cancelled.");
            navigate(`/product_detail/${res.data.id}`);
            setNotify({
              isOpen: true,
              message: "Materiál můžete vložit kdykoliv později",
              type: "info",
            });
          });
    }).catch(err => console.log("chyba",err))
  }
}

//   const productOptions = itemType.map((opt, index) => (<option key={index} value={opt.id}>
//  {opt.name}
//  </option>
// ));

  // const renderError = (message) => <p style={errorStyle}>{message}</p>;

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
        {({ isValid, setFieldValue, values }) => (
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
                    id="name"
                    name="name"
                    label="Název"
                    variant="outlined"
                    required
                  />
                </Grid>
                <Grid item xs={10}>
                  <SelectArrayWrapper
                    name="product_type"
                    // size="small"
                    label="Druh produktu ..."
                    options={productType}
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

                <Grid item xs={12}>
                  <Typography
                    variant="body1"
                    color="primary"
                    //align="center" //zarovná doprostřed
                    gutterBottom //vytvoří mezeru pod textem
                  >
                    Obsah produktu zadejte po uložení na další obrazovce
                  </Typography>
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    id="price"
                    name="price"
                    // size="small"
                    label="Prodejní cena produktu"
                    helperText="Zadejte celé číslo (bez haléřů)"
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">Kč</InputAdornment>
                      ),
                    }}
                    required
                    variant="outlined"
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    name="made"
                    // size="small"
                    label="Vyrobené množství"
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">ks</InputAdornment>
                      ),
                    }}
                    required
                    variant="outlined"
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
                  {/* {!editedProduct && (
                    <> */}
                  <Typography
                    variant="body2"
                    //color="textPrimary"
                    //align="center" //zarovná doprostřed
                    //gutterBottom //vytvoří mezeru pod textem
                  >
                    Fotografie produktu
                  </Typography>
                  <Button variant="outlined" component="label" size="small">
                    {editedProduct ? "Vyměnit forogafii" : "Vložit fotografii"}
                    <input
                      type="file"
                      name="image"
                      onChange={(event) => {
                        //setFieldValue("image", Array.from(event.target.files));
                        setFieldValue("image", event.target.files[0]);
                      }}
                      hidden
                    />
                  </Button>
                  {values.image && (
                    <Typography variant="caption" display="block" gutterBottom>
                      {values.image.name ? values.image.name : values.image}
                    </Typography>
                  )}
                  {/* <input
                    name="image"
                    type="file"
                    //multiple
                    onChange={(event) => {
                      //setFieldValue("image", Array.from(event.target.files));
                      setFieldValue("image", event.target.files[0]);
                    }}
                  /> */}
                  {/* </>
                  )} */}
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    id="procedure"
                    name="procedure"
                    multiline
                    rows={8}
                    label="Výrobní postup"
                    variant="outlined"
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    id="note"
                    name="note"
                    label="Poznámka"
                    multiline
                    rows={6}
                    variant="outlined"
                  />
                </Grid>

                <Grid item xs={3}>
                  <Button
                    type="submit"
                    className="button"
                    variant="contained"
                    onClick={() => isValid && handleClose()}
                  >
                    {editedProduct ? "Změnit" : "Přidat"}
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

      <Popup2
        title="Vložení druhu produktu"
        openPopup2={openPopup2}
        setOpenPopup2={setOpenPopup2}
      >
        <AddProductTypeForm handleClose={handleTypeClose} />
      </Popup2>
      <Notification notify={notify} setNotify={setNotify} />
    </>
  );
};
export default AddProductForm