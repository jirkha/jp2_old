import { Link } from "react-router-dom";
import { format } from 'date-fns'
//import { ColumnFilter } from './ColumnFilter'

export const TRANSACTION_COLUMNS = [
  {
    Header: "ID ",
    Footer: "ID",
    accessor: "id",
    disableFilters: true,
    Cell: ({ row }) => (
      <Link to={`/transaction_detail/${row.original.id}`}>
        {row.original.id}
      </Link>
    ),
  },
  {
    Header: "Uskutečněno ",
    Footer: "Uskutečněno",
    accessor: "day_of_sale",
    Cell: ({ value }) => {
      return format(new Date(value), "dd.MM.yyyy");
    },
  },
  {
    Header: "Prod.kanál ",
    Footer: "Prod.kanál",
    accessor: "sales_channel.name",
  },
  {
    Header: "Produkt ",
    Footer: "Produkt",
    accessor: "product.name",
  },
  {
    Header: "SLEVA ",
    Footer: "SLEVA",
    accessor: "discount_increase",
    Cell: (props) => {
      return props.value === "-" ? "SLEVA" : "";
    },
  },
  {
    Header: "Množství ",
    Footer: "Množství",
    accessor: "quantity_of_product",
    Cell: ({ row }) => {
      return `${row.original.quantity_of_product} ks`;
    },
  },
  {
    Header: "Tržba ",
    Footer: "Tržba",
    accessor: "sum_sales",
    Cell: ({ row }) => {
      return `${row.original.sum_sales.toLocaleString()} Kč`;
    },
  },
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
