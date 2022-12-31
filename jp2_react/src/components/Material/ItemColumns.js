import { Link } from "react-router-dom";
import { format } from 'date-fns'


export const ITEM_COLUMNS = [
  {
    Header: "ID ",
    Footer: "ID",
    accessor: "id",
    disableFilters: true,
  },
  {
    Header: "Název ",
    Footer: "Název",
    accessor: "name",
    Cell: ({ row }) => (
      <Link to={`/material/${row.original.id}`}>{row.original.name}</Link>
    ),
  },
  {
    Header: "Typ ",
    Footer: "Typ",
    accessor: "type.name",
  },
  {
    Header: "Cena ",
    Footer: "Cena",
    accessor: "costs",
    Cell: ({ row }) => {
      return `${row.original.costs} Kč`;
    },
  },
  {
    Header: "Skladem ",
    Footer: "Skladem",
    accessor: "quantity_of_material",
    Cell: ({ row }) => {
      return `${row.original.quantity_of_material} ${row.original.unit}`;
    },
  },
  {
    Header: "Hodnota ",
    Footer: "Hodnota",
    accessor: "value",
    Cell: ({ row }) => {
      return `${row.original.value.toLocaleString()} Kč`;
    },
  },
  // {
  //   Header: "",
  //   Footer: "",
  //   disableFilters: true,
  //   accessor: "type.id",
  //   Cell: ({ row }) => (
  //     <Link
  //       to={`/edit_material/${row.original.id}`}
  //     >
  //       <EditIcon color="warning" />
  //     </Link>
  //   ),
  // },
  {
    Header: "Dodavatel ",
    Footer: "Dodavatel",
    accessor: "supplier",
  },
  // {
  //   Header: "Odkaz ",
  //   Footer: "Odkaz",
  //   accessor: "link",
  //   //Cell: ({ row }) => <a href="row.original.link">{row.original.link}</a>,
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
      return format(new Date(value), "dd.MM.yyyy");
    },
  },
  {
    Header: "Upraveno ",
    Footer: "Upraveno",
    accessor: "updated",
    Cell: ({ value }) => {
      return format(new Date(value), "dd.MM.yyyy HH:mm:ss");
    },
  },
];
