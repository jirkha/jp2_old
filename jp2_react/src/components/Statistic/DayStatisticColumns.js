import { Link } from "react-router-dom";
import { format } from 'date-fns'
// import { ColumnFilter } from './ColumnFilter'


export const DAY_STATISTIC_COLUMNS = [
  {
    Header: "Den ",
    Footer: "Den ",
    accessor: "day",
    Cell: ({ value }) => {
      return format(new Date(value), "dd.MM.yyyy");
    },
  },
  {
    Header: "Tržby ",
    Footer: "Tržby",
    accessor: "tržby",
    Cell: ({ row }) => {
      return `${row.original.tržby.toLocaleString()} Kč`;
    },
  },
];