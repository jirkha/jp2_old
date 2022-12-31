import React, { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from 'react-router-dom';
import Axios from "axios";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import DeleteIcon from "@mui/icons-material/Delete";
import Notification from "../components/Global/Notifications/Notification";
import { Popup } from "../components/Global/Other/Popup";
import { useConfirm } from "material-ui-confirm";
import { red } from "@mui/material/colors";
import {
  Container,
  Stack,
  Typography,
  IconButton,
  Box
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";

import { useDispatch } from "react-redux";
import { getSale } from "../components/Store/Features/Products/saleSlice";
import SaleDetail from "../components/Sale/SaleDetail";
import AddSaleForm from "../components/Sale/AddSaleForm";
import SaleDetailTables from "../components/Sale/SaleDetailTables";


// není rozděleno na komponnety z důvodu potřeby aktualizace produktu vždy po přidání/odebrání item
function SaleDetailPage() {
  let { saleId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const confirm = useConfirm();
  const [openPopup, setOpenPopup] = useState(false);

  let [sale, setSale] = useState(null);
  const [title, setTitle] = useState("Vložení nového produktu");
  const color = red[900];
  const [notify, setNotify] = useState({
    isOpen: false,
    message: "",
    type: "info",
  });

  useEffect(() => {
    getThisSale();
    console.log("useEffect runs");
  }, [saleId]);

  const getThisSale = async () => {
    Axios.get(`/api/sale_detail/${saleId}`).then((res) => {
      setSale(res.data.s_ser);
      //console.log("items", product);
      console.log("Data načtena", res.data.s_ser);
    });
  };

  const editAction = (sale) => {
    //console.log("product", product);
    setTitle(`Editace prod. kanálu ${sale.name}`);
    setOpenPopup(true);
  };

  const postDelete = (id, e) => {
    e.preventDefault();
    confirm({
      //title: `Opravdu chtete vymazat položku ${type.name}?`,
      title: "Opravdu chtete vymazat tento kanál?",
      titleProps: { color: "text.primary", fontSize: 20, fontWeight: "light" },
      cancellationButtonProps: { variant: "outlined" },
      confirmationButtonProps: { variant: "outlined" },
    })
      .then(() => {
        Axios.delete(`/api/sale_delete/${id}`)
          .then(() => {
            console.log("Deleted!");
            dispatch(getSale()); //aktualizuje seznam kanálů
            navigate("/sale");
            setNotify({
              isOpen: true,
              message: "Prodejní kanál byl odstraněn",
              type: "warning",
            });
          })
          .catch((err) => console.log(err));
      })
      .catch(() => console.log("Deletion cancelled."));
  };

  return (
    <>
      {/* <ProductDetail id={productId} />
      <AddProductItemsForm id={productId} /> */}
      <Container sx={{ mt: 2 }}>
        <Link to="/sale">
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
            {sale?.name}
          </Typography>
          <Box>
            <IconButton onClick={() => editAction(sale)} sx={{ pt: "8px" }}>
              <EditIcon style={{ fontSize: 45 }} color="warning" />
            </IconButton>
            <IconButton
              type="delete"
              onClick={(e) => postDelete(sale?.id, e)}
              size="large"
              //sx={{ pt: "8px" }}
            >
              <DeleteIcon style={{ fontSize: 45, color: color }} />
            </IconButton>
          </Box>
        </Stack>

        <SaleDetail sale={sale} />

        {sale?.transaction_list?.length > 0 ? ( //zkontroluje, zda existuje transakce
          <>
          <SaleDetailTables sale={sale} />
            {/* <TableGlobalStatistic
              columns={SALETRANSACTION_COLUMNS}
              dataAPI={sale?.transaction_list}
            /> */}
          </>
        ) : (
          <Typography sx={{ m: 1 }}>
            Žádná uskutečněná transakce v tomto prodejním kanálu
          </Typography>
        )}
        <Notification notify={notify} setNotify={setNotify} />
      </Container>
      <Popup title={title} openPopup={openPopup} setOpenPopup={setOpenPopup}>
        <AddSaleForm
          getThisSale={getThisSale}
          editedSale={sale}
          setOpenPopup={setOpenPopup}
        />
      </Popup>
    </>
  );
}

export default SaleDetailPage;