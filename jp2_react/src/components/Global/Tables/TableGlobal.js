import React, { useState, useEffect, useCallback, useMemo } from "react";
import { useTable, useSortBy, useGlobalFilter, useFilters, usePagination, useRowSelect } from "react-table";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import FilterAltRoundedIcon from "@mui/icons-material/FilterAltRounded";
import { GlobalFilter } from "../../Material/GlobalFilter";
import { ColumnFilter } from "../../Material/ColumnFilter";
import DeleteColumns from "./DeleteColumns";

import {
  BsFillArrowUpSquareFill,
  BsFillArrowDownSquareFill,
  BsSortDown,
} from "react-icons/bs";
import { CheckboxTable } from "../Checkbox";

import {
  Container,
  Box,
  Stack,
  Divider,
  Button,
  ButtonGroup,
  FormGroup,
  FormControlLabel,
  FormControl,
  FormLabel,
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
  Grid,
  CircularProgress,
  Select,
  MenuItem,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";


function TableGlobal(props) {
  

  const columns = useMemo(() => props.columns, []);
  // const data = useMemo(() => props.dataAPI);
  const data = props.dataAPI;
  const loading = props.loadingState;
  const { addAction, editAction } = props;

  const defaultColumn = React.useMemo(
    () => ({
      Filter: ColumnFilter,
    }),
    []
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    //footerGroups,
    page,
    nextPage,
    previousPage,
    canNextPage,
    canPreviousPage,
    pageOptions,
    prepareRow,
    setPageSize,
    state,
    setGlobalFilter,
    selectedFlatRows,
    allColumns,
    getToggleHideAllColumnsProps,
  } = useTable(
    {
      columns,
      data,
      defaultColumn,
    },
    useFilters,
    useGlobalFilter,
    useSortBy,
    usePagination,
    useRowSelect,
    (hooks) => {
      hooks.visibleColumns.push((columns) => [
        {
          id: "selection",
          Header: ({ getToggleAllRowsSelectedProps }) => (
            <CheckboxTable size="small" {...getToggleAllRowsSelectedProps()} />
          ),
          Cell: ({ row }) => (
            <CheckboxTable size="small" {...row.getToggleRowSelectedProps()} />
          ),
        },
        ...columns,
      ]);
    }
  );

  const { globalFilter, pageIndex, pageSize } = state;

  const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: theme.palette.primary.main,
      color: theme.palette.common.white,
      padding: 6,
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 13,
    },
  }));


  //po dobu načítání dat se ukazuje tato komponenta, až poté se načte tabulka
  if (loading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center" }}>
        <CircularProgress />
      </Box>
    );
  }

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
      <Box sx={{ flexGrow: 1 }}>
        <Grid container>
          <Grid
            container
            item
            xs={6}
            justifyContent={"start"}
            alignContent={"center"}
          >
            {/* <FormLabel>Vyberte sloupce k zobrazení</FormLabel> */}
          </Grid>
          <Grid
            container
            item
            xs={6}
            justifyContent={"end"}
            alignContent={"center"}
          >
            <GlobalFilter filter={globalFilter} setFilter={setGlobalFilter} />
          </Grid>
        </Grid>

        <Accordion sx={{ mt: 2 }}>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <FilterAltRoundedIcon sx={{ mr: 2 }} />
            <Typography>Filtrování sloupců</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Grid container sx={{ mt: 2, mb: 1 }}>
              <Grid item xs={12}>
                <Paper elevation={2}>
                  <FormControlLabel
                    label={"Zobraz vše"}
                    control={
                      <CheckboxTable
                        size="small"
                        {...getToggleHideAllColumnsProps()}
                      />
                    }
                  />
                </Paper>
              </Grid>
            </Grid>
            <Grid container spacing={{ xs: 1, md: 1 }}>
              {allColumns.map((column) => (
                <Grid item xs={6} sm={3} md={3} key={column.id}>
                  {/* <div key={column.id}> */}
                  <Paper elevation={2}>
                    <FormControlLabel
                      label={column.Header}
                      control={
                        <CheckboxTable
                          size="small"
                          {...column.getToggleHiddenProps()}
                        />
                      }
                    />
                  </Paper>
                </Grid>
              ))}
            </Grid>
          </AccordionDetails>
        </Accordion>
      </Box>

      <Paper elevation={2} sx={{ p: "10px", mt: 2 }}>
        {/* <Stack sx={{ justifyContent: "right" }}>
          <Button
            variant="outlined"
            color="primary"
            size="large"
            onClick={() => addAction()}
          >
            Přidat {props.name}
          </Button>
        </Stack> */}
        <TableContainer
          component={Paper}
          sx={{ maxHeight: "700px", mt: 3, borderRadius: "15px" }}
        >
          <Table
            {...getTableProps()}
            //aria-label="customized table"
            size="small"
            stickyHeader
          >
            <TableHead>
              {headerGroups.map((headerGroup) => (
                <TableRow {...headerGroup.getHeaderGroupProps()}>
                  {headerGroup.headers.map((column) => (
                    //console.log("column", column),
                    <TableCell
                      sx={{
                        backgroundColor: "primary.main",
                      }}
                      {...column.getHeaderProps(column.getSortByToggleProps())}
                    >
                      {" "}
                      {column.render("Header")} {/* název sloupce */}
                      <>
                        {column.Header !== "" && (
                          <Typography>
                            {column.isSorted ? (
                              column.isSortedDesc ? (
                                <BsFillArrowDownSquareFill />
                              ) : (
                                <BsFillArrowUpSquareFill />
                              )
                            ) : (
                              <BsSortDown />
                            )}
                          </Typography>
                        )}
                      </>
                      <div>
                        {column.canFilter ? column.render("Filter") : null}
                      </div>
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            </TableHead>
            <TableBody {...getTableBodyProps()}>
              {(page.length > 0 &&
                page.map((row) => {
                  prepareRow(row);
                  return (
                    <StyledTableRow {...row.getRowProps()} hover>
                      {row.cells.map((cell) => {
                        return (
                          <StyledTableCell {...cell.getCellProps()}>
                            {cell.render("Cell")}
                          </StyledTableCell>
                        );
                      })}
                    </StyledTableRow>
                  );
                })) || (
                <StyledTableRow>
                  <Typography sx={{ flexWrap: "false" }}>
                    Žádná položka k zobrazení
                  </Typography>
                </StyledTableRow>
              )}
            </TableBody>
            {/* tfoot slouží k zobrazení legendy tabulky po tabulkou - je deaktivováno */}
            {/* <tfoot>
        {footerGroups.map((footerGroop) => (
          <tr {...footerGroop.getFooterGroupProps()}>
            {footerGroop.headers.map((column) => (
              <td {...column.getFooterProps}>{column.render("Footer")}</td>
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
            //aria-label="outlined primary button group"
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
          <Stack
            direction={{ sm: "column", md: "row" }}
            alignItems="center"
            spacing={2}
          >
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
              {[5, 10, 20, 30, 50, 100].map((pageSize) => (
                <MenuItem key={pageSize} value={pageSize}>
                  Položek {pageSize}
                </MenuItem>
              ))}
            </Select>
          </Stack>
          <Stack
            direction={{ sm: "column", md: "row" }}
            spacing={{ xs: 1, sm: 2, md: 6 }}
          >
            <ButtonGroup variant="outlined">
              <DeleteColumns
                disabledRow={selectedFlatRows.length < 1}
                typeTable={props.type}
                //rows={row.original.id}
                //key={e}
                selectedRows={selectedFlatRows}
              />
              <Button
                //type="delete"
                //size="small"
                //variant="contained"
                //color="warning"
                sx={{ mt: 1 }}
                startIcon={<EditIcon />}
                disabled={selectedFlatRows.length != 1}
                onClick={() => editAction(selectedFlatRows[0].original)}
                //onClick={() => editAction(selectedFlatRows[0].values)}
              >
                Upravit
              </Button>
            </ButtonGroup>
            <Button variant="contained" color="primary" onClick={addAction}>
              Přidat {props.name}
            </Button>
          </Stack>

          {/* <Button
          type="delete"
          size="small"
          variant="outlined"
          color="error"
          startIcon={<DeleteOutlinedIcon />}
          disabled={selectedFlatRows.length < 1}
          onClick={(e) =>
            selectedFlatRows.map(
              (row) => (
                console.log(row.original.id),
                postDelete(row.original.id, e, props.type)
              )
              //postDelete(row.original.id, e)
              //navigate("/")
            )
          }
        >
          Vymazat
        </Button> */}
        </Stack>
      </Paper>
      {/* <pre>
        <code>
          {JSON.stringify(
            {
              selectedFlatRows: selectedFlatRows.map((row) => row.original),
            },
            null,
            2
          )}
        </code>
      </pre> */}
    </>
  );
}

export default TableGlobal;
