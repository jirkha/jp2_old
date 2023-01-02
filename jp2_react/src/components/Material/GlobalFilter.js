import React, { useState } from "react";
import { useAsyncDebounce } from "react-table";
import { TextField } from "@mui/material";

export const GlobalFilter = ({ filter, setFilter }) => {
  const [value, setValue] = useState(filter);
  const onChange = useAsyncDebounce((value) => {
    setFilter(value || undefined);
  }, 350);
  return (
    <TextField
      component="span"
      label="Najdi v seznamu ..."
      variant="standard"
      size="small"
      fullWidth
      value={value || ""}
      onChange={(e) => {
        setValue(e.target.value);
        onChange(e.target.value);
      }}
    />
  );
};
