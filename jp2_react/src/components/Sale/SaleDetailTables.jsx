import { Stack, Box, Typography } from "@mui/material";
import React from "react";
import { TableGlobalStatistic } from "../Global/Tables/TableGlobalStatistic";
import { SALETRANSACTION_COLUMNS } from "./SaleTransactionColumns";
import { SALEYEARSSALES_COLUMNS } from "./SaleYearsSalesColumns";
import TimelineIcon from "@mui/icons-material/Timeline";
import ReceiptLongIcon from "@mui/icons-material/ReceiptLong";

function SaleDetailTables({ sale }) {
  return (
    <>
      <Stack
        sx={{ ml: 1 }}
        spacing={2}
        direction={{ xs: "column", lg: "row" }}
        justifyContent="space-between"
      >
        <Box>
          <Typography variant="subtitle1" color="primary">
            <ReceiptLongIcon color="inherit" sx={{ mr: 2, mb: "-4px" }} />
            Histrorie transakcí
          </Typography>
          <TableGlobalStatistic
            columns={SALETRANSACTION_COLUMNS}
            dataAPI={sale?.transaction_list}
          />
        </Box>
        <Box>
          <Typography variant="subtitle1" color="primary">
            <TimelineIcon color="inherit" sx={{ mr: 2, mb: "-4px" }} />
            Roční tržby
          </Typography>
          <TableGlobalStatistic
            columns={SALEYEARSSALES_COLUMNS}
            dataAPI={sale?.years_sales}
          />
        </Box>
      </Stack>
    </>
  );
}

export default SaleDetailTables;
