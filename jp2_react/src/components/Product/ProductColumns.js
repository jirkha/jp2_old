import { Link } from "react-router-dom";
import { format } from "date-fns";
import EditIcon from "@mui/icons-material/Edit";
import { IconButton } from "@mui/material";
//import { ColumnFilter } from './ColumnFilter'

export const PRODUCT_COLUMNS = [
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
      <Link to={`/product_detail/${row.original.id}`}>{row.original.name}</Link>
    ),
  },
  {
    Header: "Druh ",
    Footer: "Druh",
    accessor: "product_type.name",
  },
  // {
  //   Header: "Obsah ",
  //   Footer: "Obsah",
  //   accessor: "items.name",
  // },
  {
    Header: "Prod.cena ",
    Footer: "Prod.cena",
    accessor: "price",
    Cell: ({ row }) => {
      return `${row.original.price} Kč`;
    },
  },
  {
    Header: "Náklady ",
    Footer: "Náklady",
    accessor: "costs",
    Cell: ({ row }) => {
      return `${row.original.costs} Kč`;
    },
  },
  {
    Header: "Vyrobeno ",
    Footer: "Vyrobeno",
    accessor: "made",
    Cell: ({ row }) => (
      <Link
        style={{ color: "inherit", textDecoration: "inherit" }}
        to={`/product_detail/${row.original.id}`}
        state={{ data: "made" }}
      >
        {`${row.original.made} ks`}
        <IconButton>
          <EditIcon fontSize="small" color="warning" />
        </IconButton>
      </Link>
    ),
    // Cell: ({ row }) => (
    //   <div>
    //     {`${row.original.made} ks   `}
    //     <IconButton
    //       onClick={() => OpenP(row.original)}
    //       // onClick={() => <OpenP />}
    //     >
    //       <EditIcon
    //         //onClick={() => Open(row.original)}
    //         fontSize="small"
    //         color="warning"
    //       />
    //     </IconButton>
    //   </div>
    // ),
  },
  {
    Header: "Skladem ",
    Footer: "Skladem",
    accessor: "stocked",
    Cell: ({ row }) => {
      return `${row.original.stocked} ks`;
    },
  },
  {
    Header: "Prodáno ",
    Footer: "Prodáno",
    accessor: "sold",
    Cell: ({ row }) => {
      return `${row.original.sold} ks`;
    },
  },
  {
    Header: "J&P ",
    Footer: "J&P",
    accessor: "brand",
    onClick: () => {
      alert("click!");
    },
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
