import React, { useState, useEffect } from "react";
import { format } from "date-fns";
import { Popup } from "../Global/Other/Popup";
import EditIcon from "@mui/icons-material/Edit";
import {
  Container,
  Typography,
  Grid,
  IconButton,
  Box,
  Divider,
} from "@mui/material";

import { Stack } from "@mui/system";
import { Popup2 } from "../Global/Other/Popup2";

function SaleDetail({ sale }) {
  const [openPopup, setOpenPopup] = useState(false);

  const rows = [
    { name: "Ident. číslo", content: sale?.id },
    //{ name: "Název", content: sale.name },
    { name: "Druh", content: sale?.type.name },
    { name: "Celkový počet transakcí", content: sale?.transaction_count },
    { name: "Celkové tržby", content: `${sale?.amount.toLocaleString()} Kč` },
    { name: "Značka", content: sale?.brand ? "J&P" : "externí prodejní kanál" },
    sale?.note
      ? { name: "Poznámka", content: sale?.note }
      : { noDivider: true },
    { name: "Vytvořeno", content: sale?.created },
    { name: "Upraveno", content: sale?.updated },
    //{ name: "Historie transakcí", noDivider: true },
  ];

  return (
    <>
      {/* <Container>
        <Stack ml={-5} direction={{ xs: "column", md: "row" }}> */}
      <Container sx={{mt:2, mb: 1}}>
        <Grid
          container
          spacing={2}
          //direction={"row"}
          //alignContent={"center"}
          //xs={12}
        >
          {rows.map((row, key) => {
            return (
              <Grid container spacing={2} key={key}>
                <Grid item xs={4}>
                  <Typography variant="subtitle1" color="primary">
                    {row?.name}
                  </Typography>
                </Grid>

                <Grid item xs={8}>
                  <Typography variant="subtitle1">{row?.content}</Typography>
                </Grid>
                {row?.noDivider ? undefined : (
                  <Divider
                    variant="middle"
                    sx={{ mb: 2 }}
                    style={{ width: "80%" }}
                  />
                )}
              </Grid>
            );
          })}
        </Grid>
      </Container>
    </>
  );
}

export default SaleDetail;
