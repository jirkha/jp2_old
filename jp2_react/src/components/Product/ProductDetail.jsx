import React, {useState,useEffect} from 'react'
import { format } from 'date-fns';
import {Popup} from "../Global/Other/Popup";
import EditIcon from '@mui/icons-material/Edit';
import {
  Container,
  Typography,
  Grid,
  IconButton,
  Box,
  Divider,
} from "@mui/material";
import UpdateMadeProduct from './UpdateMadeProduct';
import ProductItems from "./ProductItems";
import { Stack } from '@mui/system';
import { Popup2 } from '../Global/Other/Popup2';


function ProductDetail(props) {

    const product = props.data;
    const [openPopup, setOpenPopup] = useState(false)
    const { getThisProduct, setOpenPopup2 } = props;

    useEffect(() => {
      //console.log("props.query",props.query.state.data)
      if (props.query.state?.data === "made") {
      setOpenPopup(true)
    }
    }, [])


  return (
    <>
      <Container>
        <Stack ml={-5} direction={{ xs: "column", md: "row" }}>
          <Container>
            <Grid
              container
              spacing={2}
              //direction={"row"}
              //alignContent={"center"}
              //xs={12}
            >
              <Grid
                //container
                item
                xs={4}
                //justifyContent={"start"}
              >
                <Typography variant="subtitle1" color="primary">
                  Ident. číslo
                </Typography>
              </Grid>
              <Grid
                //container
                item
                xs={8}
                //justifyContent={"start"}
              >
                <Typography variant="subtitle1">{product?.id}</Typography>
              </Grid>
              <Divider variant="middle" style={{ width: "80%" }} />
              <Grid item xs={4}>
                <Typography variant="subtitle1" color="primary">
                  Typ produktu
                </Typography>
              </Grid>
              <Grid item xs={8}>
                <Typography variant="subtitle1">
                  {product?.product_type.name}
                </Typography>
              </Grid>
              <Divider variant="middle" style={{ width: "80%" }} />
              <Grid item xs={4}>
                <Typography variant="subtitle1" color="primary">
                  Prodejní cena
                </Typography>
              </Grid>
              <Grid item xs={8}>
                <Typography variant="subtitle1">
                  {product?.price} Kč za ks
                </Typography>
              </Grid>
              <Divider variant="middle" style={{ width: "80%" }} />
              <Grid item xs={4}>
                <Typography variant="subtitle1" color="primary">
                  Náklady na výrobu
                </Typography>
              </Grid>
              <Grid item xs={8}>
                <Typography variant="subtitle1">
                  {product?.costs} Kč za ks
                </Typography>
              </Grid>
              <Divider variant="middle" style={{ width: "80%" }} />
              <Grid item xs={4}>
                <Typography variant="subtitle1" color="primary">
                  Vyrobeno
                </Typography>
              </Grid>
              <Grid item xs={8}>
                <Typography variant="subtitle1">
                  {product?.made} ks
                  <IconButton
                    color="primary"
                    sx={{ pt: "0px" }} //padding top 0 posune ikonu nahoru
                    onClick={() => setOpenPopup(true)}
                  >
                    <EditIcon fontSize="inherit" />
                  </IconButton>
                </Typography>
              </Grid>
              <Divider variant="middle" style={{ width: "80%" }} />
              <Grid item xs={4}>
                <Typography variant="subtitle1" color="primary">
                  Skladem
                </Typography>
              </Grid>
              <Grid item xs={8}>
                <Typography variant="subtitle1">
                  {product?.stocked} ks
                </Typography>
              </Grid>
              <Divider variant="middle" style={{ width: "80%" }} />
              <Grid item xs={4}>
                <Typography variant="subtitle1" color="primary">
                  Prodáno
                </Typography>
              </Grid>
              <Grid item xs={8}>
                <Typography variant="subtitle1">{product?.sold} ks</Typography>
              </Grid>
              <Divider variant="middle" style={{ width: "80%" }} />
              <Grid item xs={4}>
                <Typography variant="subtitle1" color="primary">
                  J&P
                </Typography>
              </Grid>
              <Grid item xs={8}>
                <Typography variant="subtitle1">
                  {product?.brand ? "ANO" : "NE"}
                </Typography>
              </Grid>
              <Divider variant="middle" style={{ width: "80%" }} />
              <Grid item xs={4}>
                <Typography variant="subtitle1" color="primary">
                  Vytvořeno
                </Typography>
              </Grid>
              <Grid item xs={8}>
                <Typography variant="subtitle1">
                  {/* {format(new Date(product?.p_ser.created), 'dd.MM.yyyy kk:mm:ss')} */}
                  {product?.created}
                </Typography>
              </Grid>
              <Divider variant="middle" style={{ width: "80%" }} />
              <Grid item xs={4}>
                <Typography variant="subtitle1" color="primary">
                  Upraveno
                </Typography>
              </Grid>
              <Grid item xs={8}>
                <Typography variant="subtitle1">
                  {/* {format(new Date(product?.p_ser.updated), 'dd.MM.yyyy kk:mm:ss')} */}
                  {product?.updated}
                </Typography>
              </Grid>
              <Divider
                variant="middle"
                style={{ width: "80%" }}
                sx={{ mb: 2 }}
              />
            </Grid>
          </Container>
          {product?.image && (
            <Container>
              <Grid item xs={4}>
                <Typography variant="subtitle1" color="primary">
                  Obrázek
                </Typography>
              </Grid>
              <Grid item xs={8}>
                <Box
                  component="img"
                  sx={{
                    // height: 233,
                    // width: 350,
                    maxHeight: { sm: 350, xs: 250 },
                    maxWidth: { sm: 525, xs: 375 },
                  }}
                  alt="produkt"
                  src={product?.image}
                />
              </Grid>
            </Container>
          )}
        </Stack>
        <Stack ml={-2}>
          <Typography variant="subtitle1" color="primary" sx={{ mb: 2 }}>
            Obsah produktu
            <IconButton
              onClick={() => setOpenPopup2(true)}
              sx={{ pt: "0px" }}
            >
              <EditIcon style={{ fontSize: 32 }} color="warning" />
            </IconButton>
          </Typography>
        </Stack>
      </Container>

      <Popup
        title="Úprava počtu naskladněných výrobků"
        openPopup={openPopup}
        setOpenPopup={setOpenPopup}
      >
        <UpdateMadeProduct
          id={product?.id}
          getProduct={getThisProduct}
          setOpenPopup={setOpenPopup}
        />
      </Popup>
      {/* <Popup2
        title="Úprava produktového obrázku"
        openPopup2={openPopup2}
        setOpenPopup2={setOpenPopup2}
      >
        <UpdateImage
          setOpenPopup2={setOpenPopup2}
          getThisProduct={getThisProduct}
        />
      </Popup2> */}
    </>
  );
}

export default ProductDetail