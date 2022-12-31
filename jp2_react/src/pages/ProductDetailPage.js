import React, { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from 'react-router-dom';
import Axios from "axios";
import SelectArrayWrapper from "../components/Global/Select/SelectArrayWrapper";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import DeleteIcon from "@mui/icons-material/Delete";
import Notification from "../components/Global/Notifications/Notification";
import { Popup } from "../components/Global/Other/Popup";
import { Popup2 } from "../components/Global/Other/Popup2";
import { useLocation } from "react-router-dom";
import { useConfirm } from "material-ui-confirm";
import { red } from "@mui/material/colors";
import {
  Button,
  Container,
  Stack,
  Typography,
  IconButton,
  Box
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";

import { useDispatch } from "react-redux";
import { getProduct as GetP } from "../components/Store/Features/Products/productSlice";
import ProductDetail from "../components/Product/ProductDetail";
import AddProductForm from "../components/Product/AddProductForm";
import ProductItems from "../components/Product/ProductItems";
import { TableGlobalStatistic } from "../components/Global/Tables/TableGlobalStatistic";
import { ITEMSINPRODUCT_COLUMNS } from "../components/Product/ItemsInProductColumns";


// není rozděleno na komponnety z důvodu potřeby aktualizace produktu vždy po přidání/odebrání item
function ProductDetailPage() {
  let { productId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const confirm = useConfirm();
  const [openPopup, setOpenPopup] = useState(false);
  const [openPopup2, setOpenPopup2] = useState(false);

  let [product, setProduct] = useState(null);
  const [title, setTitle] = useState("Vložení nového produktu");
  const query = useLocation();
  const color = red[900];
  const [notify, setNotify] = useState({
    isOpen: false,
    message: "",
    type: "info",
  });

  useEffect(() => {
    getThisProduct();
    //console.log("items", product);
    if (query.state?.data === "items") {
      setOpenPopup2(true);
    }
    // console.log("getProduct: ", product);
  }, [SelectArrayWrapper]);

  const getThisProduct = async () => {
    Axios.get(`/api/product_detail/${productId}`).then((res) => {
      setProduct(res.data.p_ser);
      //console.log("items", product);
      console.log("Data načtena", res.data.p_ser);
    });
  };
    
    const editAction = (product) => {
      //console.log("product", product);
      setTitle(`Editace produktu ${product.name}`);
      setOpenPopup(true);
    };

  const postDelete = (id, e) => {
    e.preventDefault();
    confirm({
      //title: `Opravdu chtete vymazat položku ${type.name}?`,
      title: "Opravdu chtete vymazat tento produkt?",
      titleProps: { color: "text.primary", fontSize: 20, fontWeight: "light" },
      cancellationButtonProps: { variant: "outlined" },
      confirmationButtonProps: { variant: "outlined" },
    })
    .then(() => {
    Axios.delete(`/api/product_delete/${id}`)
      .then(() => {
        console.log("Deleted!");
        dispatch(GetP()); //aktualizuje seznam produktů
        navigate("/product");
        setNotify({
          isOpen: true,
          message: "Produkt byl odstraněn",
          type: "warning",
        });
      })
      .catch((err) => console.log(err));
          
  }).catch(() => console.log("Deletion cancelled."));
  }


  return (
    <>
      {/* <ProductDetail id={productId} />
      <AddProductItemsForm id={productId} /> */}
      <Container sx={{ mt: 2 }}>
        <Link to="/product">
          <ArrowBackIcon color="primary" />
        </Link>
        <Stack
          justifyContent="space-between" //rozložení položek
          alignItems="flex-start"
          direction={{
            xs: "column",
            sm: "row",
          }}
        >
          <Typography
            variant="h3"
            color="primary"
            gutterBottom //vytvoří mezeru pod textem
          >
            {product?.name}
          </Typography>
          <Box>
            <IconButton onClick={() => editAction(product)} sx={{ pt: "8px" }}>
              <EditIcon style={{ fontSize: 45 }} color="warning" />
            </IconButton>
            <IconButton
              type="delete"
              onClick={(e) => postDelete(product?.id, e)}
              size="large"
              //sx={{ pt: "8px" }}
            >
              <DeleteIcon style={{ fontSize: 45, color: color }} />
            </IconButton>
          </Box>
        </Stack>

        <ProductDetail
          data={product}
          getThisProduct={getThisProduct}
          setOpenPopup2={setOpenPopup2}
          query={query}
        />

        {product?.items?.length > 0 ? ( //zkontroluje, zda produktu obsahuje materiál
          <>
            <TableGlobalStatistic
              columns={ITEMSINPRODUCT_COLUMNS}
              dataAPI={product?.items}
            />
          </>
        ) : (
          <Typography sx={{ mt: -1, ml: 1 }}>
            V produktu není vložen žádný materiál (obsah)
          </Typography>
        )}
        <Notification notify={notify} setNotify={setNotify} />
      </Container>
      <Popup title={title} openPopup={openPopup} setOpenPopup={setOpenPopup}>
        <AddProductForm
          editedProduct={product}
          getThisProduct={getThisProduct}
          setOpenPopup={setOpenPopup}
        />
      </Popup>
      <Popup2
        title="Vložení obsahu produktu"
        openPopup2={openPopup2}
        setOpenPopup2={setOpenPopup2}
      >
        <ProductItems
          product={product}
          productId={productId}
          getProduct={getThisProduct}
        />
      </Popup2>
    </>
  );
}

export default ProductDetailPage