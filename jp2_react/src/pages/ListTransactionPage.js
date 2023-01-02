import React from 'react'

import AddProductTypeForm from "../components/Product/AddProductTypeForm";
import AddProductForm from "../components/Product/AddProductForm";
import AddSaleTypeForm from "../components/Sale/AddSaleTypeForm";
import AddSaleForm from "../components/Sale/AddSaleForm";
import TableTransaction from "../components/Sale/TableTransaction";

import { Container, Typography, Stack } from "@mui/material";
import AddTransactionForm from "../components/Sale/AddTransactionForm";


function ListTransactionPage() {

  return (
    <div>
      <Container component="section" id="transactionList">
        <Typography
          variant="h2"
          sx={{ mt: 3 }} //mezera nad textem
          color="primary"
          align="center" //zarovná doprostřed
          gutterBottom //vytvoří mezeru pod textem
        >
          &#9782; Transakce
        </Typography>
        <TableTransaction />
      </Container>
    </div>
  );
}

export default ListTransactionPage;