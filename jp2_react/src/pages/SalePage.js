import React from 'react'

import TableSale from "../components/Sale/TableSale";

import { Container, Typography, Stack } from "@mui/material";
import SaleTypesList from '../components/Sale/SaleTypesList';


function SalePage() {
  return (
    <div>
      <Container component="section" id="sale">
        <Typography
          variant="h2"
          sx={{ mt: 3 }} //mezera nad textem
          color="primary"
          align="center" //zarovná doprostřed
          gutterBottom //vytvoří mezeru pod textem
        >
          &#9782; Prodejní kanály
        </Typography>
        <TableSale />
      </Container>

      <Container component="section" id="itemForm">
        {/*<FormContainer> */}
        <Typography
          variant="h3"
          sx={{ mt: 5 }} //mezera nad textem
          color="primary"
          align="center" //zarovná doprostřed
          gutterBottom //vytvoří mezeru pod textem
        >
          &#9782; Druhy prodejních kanálů
        </Typography>
        <Stack sx={{ justifyContent: "center" }} direction="row">
          <SaleTypesList />
        </Stack>

        {/* </FormContainer>*/}
      </Container>
    </div>
  );
}

export default SalePage;