import { Link } from "react-router-dom";
import { format } from 'date-fns'
import EditIcon from "@mui/icons-material/Edit";
//import { ColumnFilter } from './ColumnFilter'

export const SALE_COLUMNS = [
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
      <Link to={`/sale_detail/${row.original.id}`}>{row.original.name}</Link>
    ),
  },
  {
    Header: "Druh ",
    Footer: "Druh",
    accessor: "type.name",
  },
  {
    Header: "Transakcí ",
    Footer: "Transakcí",
    accessor: "transaction_count",
  },
  {
    Header: "Tržby ",
    Footer: "Tržby",
    accessor: "amount",
    Cell: ({ row }) => {
      return `${row.original.amount.toLocaleString()} Kč`;
    },
  },
  {
    Header: "J&P ",
    Footer: "J&P",
    accessor: "brand",
    Cell: (props) => {
      return props.value === true ? "J&P" : "";
    },
  },
  // {
  //   Header: "Poznámka ",{open ? "yes" : "no"}
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
