import { Link } from "react-router-dom";
import { format } from 'date-fns'


export const SALETRANSACTION_COLUMNS = [
  {
    Header: "ID ",
    Footer: "ID",
    accessor: "id",
    disableFilters: true,
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
    Header: "Produkt ",
    Footer: "Produkt",
    accessor: "product_name",
    Cell: ({ row }) => (
      <Link to={`/product_detail/${row.original.product_id}`}>
        {row.original.product_name}
      </Link>
    ),
  },
  {
    Header: "Množství",
    Footer: "Množství ",
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
    Header: "SLEVA ",
    Footer: "SLEVA",
    accessor: "discount_increase",
    Cell: (props) => {
      return props.value === "-" ? "SLEVA" : "Bez slevy";
    },
  },
];
