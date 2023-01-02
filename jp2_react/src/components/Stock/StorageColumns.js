import { Link } from "react-router-dom";
import { format } from 'date-fns'
// import { ColumnFilter } from './ColumnFilter'


export const STORAGE_COLUMNS = [
  {
    Header: "ID ",
    Footer: "ID",
    accessor: "id",
    disableFilters: true,
  },
  {
    Header: "Naskladněno ",
    Footer: "Den naskladnění",
    accessor: "day_of_storage",
    Cell: ({ value }) => {
      return format(new Date(value), "dd.MM.yyyy");
    },
    // Cell: ({ row }) => (
    //   <Link to={`/material/${row.original.id}`}>{row.original.name}</Link>
    // ),
  },
  {
    Header: "Materiál ",
    Footer: "Materiál",
    accessor: "item.name",
    Cell: ({ row }) => (
      <Link to={`/material/${row.original.item.id}`}>{row.original.item.name}</Link>
    ),
  },
  {
    Header: "Množství ",
    Footer: "Množství",
    accessor: "quantity_of_material",
    Cell: ({ row }) => {
      return `${row.original.quantity_of_material} ${row.original.item.unit}`;
    },
  },
  // {
  //   Header: "Odkaz ",
  //   Footer: "Odkaz",
  //   accessor: "link",
  //   Cell: ({ row }) => <a href={row.original.link}>{row.original.link}</a>,
  // },
  // {
  //   Header: "Poznámka ",
  //   Footer: "Poznámka",
  //   accessor: "note",
  //   Filter: ColumnFilter,
  // },
  {
    Header: "Vytvořeno ",
    Footer: "Vytvořeno",
    accessor: "created",
    Cell: ({ value }) => {
      return format(new Date(value), "dd.MM.yyyy HH:mm");
    },
  },
  // {
  //   Header: "Upraveno ",
  //   Footer: "Upraveno",
  //   accessor: "updated",
  //   Cell: ({ value }) => {
  //     return format(new Date(value), "dd.MM.yyyy HH:mm:ss");
  //   },
  // },
];
