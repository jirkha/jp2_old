import { Link } from "react-router-dom";
import { format } from 'date-fns'
// import { ColumnFilter } from './ColumnFilter'


export const MONTH_STATISTIC_COLUMNS = [
  //   {
  //     Header: "Rok ",
  //     Footer: "Rok ",
  //     accessor: "year",
  //     // Cell: ({ value }) => {
  //     //   return format(new Date(value), "dd.MM.yyyy");
  //     // },
  //   },
  {
    Header: "Měsíc ",
    Footer: "Měsíc ",
    accessor: "month",
    // Cell: ({ value }) => {
    //   return format(new Date(value), "dd.MM.yyyy");
    // },
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