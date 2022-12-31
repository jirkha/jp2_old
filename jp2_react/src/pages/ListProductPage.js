import React from 'react'

import TableProduct from '../components/Product/TableProduct';

import { Container, Typography, Stack } from "@mui/material";
import ProductTypesList from '../components/Product/ProductTypesList';


function ListProductPage() {

  return (
    <div>
      <Container component="section" id="productList">
        <Typography
          variant="h2"
          sx={{ mt: 3 }} //mezera nad textem
          color="primary"
          align="center" //zarovná doprostřed
          gutterBottom //vytvoří mezeru pod textem
        >
          &#9782; Produkty
        </Typography>
        <TableProduct />
      </Container>

      {/* <Container component="section" id="productForm">
        <Typography
          variant="h2"
          sx={{ mt: 5 }} //mezera nad textem
          color="primary"
          align="center" //zarovná doprostřed
          gutterBottom //vytvoří mezeru pod textem
        >
          &#9782; Přidat produkt
        </Typography>
        <Stack sx={{ justifyContent: "center" }} direction="row">
          <AddProductForm />
        </Stack>
      </Container> */}

      <Container component="section" id="itemForm">
        <Typography
          variant="h3"
          sx={{ mt: 5 }} //mezera nad textem
          color="primary"
          align="center" //zarovná doprostřed
          gutterBottom //vytvoří mezeru pod textem
        >
          &#9782; Druhy produktů
        </Typography>
        <Stack sx={{ justifyContent: "center" }} direction="row">
          <ProductTypesList />
        </Stack>
      </Container>
    </div>
  );
}

export default ListProductPage;