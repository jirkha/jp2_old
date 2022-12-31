import React from "react";

import { Container, Typography, Stack, Box } from "@mui/material";

function StatisticUnit(props) {
  return (
    <div>
      {/* <Container component="section" id="storageForm"> */}
      <Typography
        variant="h4"
        sx={{ mt: 2 }} //mezera nad textem
        color="primary"
        align="center" //zarovná doprostřed
        gutterBottom //vytvoří mezeru pod textem
      >
        &#9782; {props.title}
      </Typography>
      {props.filter && (
        <Stack
          //maxWidth={200}
          sx={{ mb: 4 }}
        >
          {props.filter}
        </Stack>
      )}
      <Stack
        justifyContent="space-around" //vzájemná poloha
        direction={{ xs: "column", lg: "row" }}
        spacing={{ xs: 1, sm: 2, md: 4 }}
        sx={{ mb: 5 }} //mezera pod komponentou
      >
        {props.children}
        <Box sx={{ maxWidth: 350 }}>{props.table}</Box>
        <Box>{props.chart}</Box>
      </Stack>
      {/* </Container> */}
    </div>
  );
}

export default StatisticUnit;
