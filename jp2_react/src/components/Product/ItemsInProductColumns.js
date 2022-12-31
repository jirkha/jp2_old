import { Link } from "react-router-dom";
import { format } from 'date-fns'


export const ITEMSINPRODUCT_COLUMNS = [
  {
    Header: "ID ",
    Footer: "ID",
    accessor: "item.id",
    disableFilters: true,
  },
  {
    Header: "Materiál ",
    Footer: "Materiál",
    accessor: "item.name",
    Cell: ({ row }) => (
      <Link to={`/material/${row.original.item.id}`}>
        {row.original.item.name}
      </Link>
    ),
  },
  {
    Header: "Množství",
    Footer: "Množství ",
    accessor: "quantity",
    Cell: ({ row }) => {
      return `${row.original.quantity} ${row.original.item.unit}`;
    },
  },
  {
    Header: "Cena ",
    Footer: "Cena ",
    accessor: "item_price",
    Cell: ({ row }) => {
      return `${row.original.item_price} Kč`;
    },
  },
  {
    Header: "Typ ",
    Footer: "Typ",
    accessor: "item.type.name",
  },
  {
    Header: "Cena za jednotku ",
    Footer: "Cena za jednotku",
    accessor: "item.costs",
    Cell: ({ row }) => {
      return `${row.original.item.costs} Kč`;
    },
  },
  {
    Header: "Skladem ",
    Footer: "Skladem",
    accessor: "item.quantity_of_material",
    Cell: ({ row }) => {
      return `${row.original.item.quantity_of_material} ${row.original.item.unit}`;
    },
  },
  //   {
  //     Header: "Hodnota ",
  //     Footer: "Hodnota",
  //     accessor: "item.value",
  //     Cell: ({ row }) => {
  //       return `${row.original.value.toLocaleString()} Kč`;
  //     },
  //   },
  {
    Header: "Dodavatel ",
    Footer: "Dodavatel",
    accessor: "item.supplier",
  },
  // {
  //   Header: "Odkaz ",
  //   Footer: "Odkaz",
  //   accessor: "item.link",
  //   //Cell: ({ row }) => <a href="row.original.link">{row.original.link}</a>,
  // },
  // {
  //   Header: "Poznámka ",
  //   Footer: "Poznámka",
  //   accessor: "item.note",
  //   Filter: ColumnFilter,
  // },
  // {
  //   Header: "Vytvořeno ",
  //   Footer: "Vytvořeno",
  //   accessor: "item.created",
  //   Cell: ({ value }) => {
  //     return format(new Date(value), "dd.MM.yyyy");
  //   },
  // },
  // {
  //   Header: "Upraveno ",
  //   Footer: "Upraveno",
  //   accessor: "item.updated",
  //   Cell: ({ value }) => {
  //     return format(new Date(value), "dd.MM.yyyy HH:mm:ss");
  //   },
  // },
];
