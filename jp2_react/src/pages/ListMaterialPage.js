import React from 'react'
import TableItem from '../components/Material/TableItem'
import { Container, Typography, Stack } from "@mui/material";
import ItemTypesList from '../components/Material/ItemTypesList';


function ListMaterialPage() {

  return (
    <div>
      <Container component="section" id="itemList">
        {/* <HeaderPage> */}
        <Typography
          variant="h2"
          sx={{ mt: 3 }} //mezera nad textem
          color="primary"
          align="center" //zarovná doprostřed
          gutterBottom //vytvoří mezeru pod textem
        >
          &#9782; Materiál
        </Typography>
        {/* </HeaderPage> */}
        <TableItem />
        {/* </Container> */}
      </Container>
      {/*</div> */}

      {/* <section id="itemForm"> */}

      {/* <div className="notes"> */}
      <Container component="section" id="itemForm">
        {/*<FormContainer> */}
        <Typography
          variant="h3"
          sx={{ mt: 5 }} //mezera nad textem
          color="primary"
          align="center" //zarovná doprostřed
          gutterBottom //vytvoří mezeru pod textem
        >
          &#9782; Druhy materiálu
        </Typography>
        <Stack sx={{ justifyContent: "center" }} direction="row">
          <ItemTypesList />
        </Stack>

        {/* </FormContainer>*/}
      </Container>
      {/* </section> */}
    </div>
  );
}

export default ListMaterialPage;