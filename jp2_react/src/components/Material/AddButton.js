//rafc (zkratka)
import React from 'react'
//import { Link } from 'react-router-dom'
import { HashLink as Link } from "react-router-hash-link";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";

export const AddButton = (props) => {
  return (
    // <Link to="/edit_material" className='floating-button'>
    //     <AddIcon />
    // </Link>
    <Link to={props.link}>
      <AddCircleOutlineIcon color={props.color} fontSize={props.fontSize} />
    </Link>
  );
}
