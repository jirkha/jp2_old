import { Link } from "react-router-dom";
import { format } from 'date-fns'


export const SALEYEARSSALES_COLUMNS = [
  {
    Header: "Rok ",
    Footer: "Rok",
    accessor: "day_of_sale__year",
  },
  {
    Header: "Tržba ",
    Footer: "Tržba",
    accessor: "amount",
    Cell: ({ row }) => {
      return `${row.original.amount.toLocaleString()} Kč`;
    },
  },
];
