import React, { useMemo } from "react";
import { useTable, usePagination, useSortBy } from "react-table";

import {
  BsFillArrowUpSquareFill,
  BsFillArrowDownSquareFill,
  BsSortDown,
} from "react-icons/bs";

import {
  Stack,
  Button,
  ButtonGroup,
  TableContainer,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Typography,
  Paper,
  tableCellClasses,
  styled,
  Select,
  MenuItem,
} from "@mui/material";

export const TableGlobalStatistic = (props) => {

  const columns = useMemo(() => props.columns, []);
   const data = props.dataAPI;
   const loading = props.loadingState;

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    footerGroups,
    page,
    nextPage,
    previousPage,
    canNextPage,
    canPreviousPage,
    pageOptions,
    prepareRow,
    setPageSize,
    state,
  } = useTable(
    {
      columns,
      data,
      initialState: { pageSize: 8 },
    },
    useSortBy, //umožní řazení dat dle hodnoty
    usePagination //umožní stránkování tabulky
  );

    const { globalFilter, pageIndex, pageSize } = state;

    const StyledTableCell = styled(TableCell)(({ theme }) => ({
      [`&.${tableCellClasses.head}`]: {
        backgroundColor: theme.palette.primary.main,
        color: theme.palette.common.white,
        padding: 6,
      },
      [`&.${tableCellClasses.body}`]: {
        fontSize: 12, //velikost písma
        height: 15, //výška řádků tabulky
      },
    }));

    const StyledTableRow = styled(TableRow)(({ theme }) => ({
      "&:nth-of-type(odd)": {
        backgroundColor: theme.palette.action.hover,
      },
      // hide last border
      "&:last-child td, &:last-child th": {
        border: 0,
      },
    }));

  return (
    <>
      <TableContainer
        component={Paper}
        sx={{ maxHeight: "700px", borderRadius: "15px" }}
      >
        <Table {...getTableProps()} stickyHeader>
          <TableHead>
            {headerGroups.map((headerGroup) => (
              <TableRow {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map((column) => (
                  <TableCell
                    sx={{
                      backgroundColor: "primary.main",
                    }}
                    {...column.getHeaderProps(column.getSortByToggleProps())}
                  >
                    {column.render("Header")} {/* název sloupce */}
                    <>
                      {column.Header !== "" && (
                        <>
                          {column.isSorted ? (
                            column.isSortedDesc ? (
                              <BsFillArrowDownSquareFill />
                            ) : (
                              <BsFillArrowUpSquareFill />
                            )
                          ) : (
                            <BsSortDown />
                          )}
                        </>
                      )}
                    </>
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableHead>
          <TableBody {...getTableBodyProps()}>
            {page.map((row) => {
              prepareRow(row);
              return (
                <StyledTableRow {...row.getRowProps()}>
                  {row.cells.map((cell) => {
                    return (
                      <StyledTableCell {...cell.getCellProps()}>
                        {cell.render("Cell")}
                      </StyledTableCell>
                    );
                  })}
                </StyledTableRow>
              );
            })}
          </TableBody>
          {/* <tfoot>
            {footerGroups.map((footerGroup) => (
              <tr {...footerGroup.getFooterGroupProps()}>
                {footerGroup.headers.map((column) => (
                  <td {...column.getFooterProps()}>
                    {column.render("Footer")}
                  </td>
                ))}
              </tr>
            ))}
          </tfoot> */}
        </Table>
      </TableContainer>
      <Stack
        direction="row"
        alignItems="center"
        spacing={4}
        justifyContent="space-between"
      >
        <ButtonGroup
          variant="contained"
          //size="small"
          aria-label="outlined primary button group"
        >
          <Button
            size="small"
            onClick={() => previousPage()}
            disabled={!canPreviousPage}
          >
            {" << "}
          </Button>
          <Button
            size="small"
            onClick={() => nextPage()}
            disabled={!canNextPage}
          >
            {" "}
            {" >> "}
          </Button>
        </ButtonGroup>
        <Stack direction="row" alignItems="center" spacing={2}>
          <Typography>
            Strana{" "}
            <strong>
              {pageIndex + 1} z {pageOptions.length}
            </strong>
          </Typography>
          <Select
            value={pageSize}
            size="small"
            onChange={(e) => setPageSize(Number(e.target.value))}
          >
            {[5, 8, 10, 20, 50, 100].map((pageSize) => (
              <MenuItem key={pageSize} value={pageSize}>
                Položek {pageSize}
              </MenuItem>
            ))}
          </Select>
        </Stack>
      </Stack>
    </>
  );
};
