import React, { useState, useEffect } from "react";
import { TextField, MenuItem } from "@mui/material";
import { useField, useFormikContext } from "formik";
import Axios from "axios";
import { useDispatch } from "react-redux";
import { getMaterialType } from "../../Store/Features/Material/materialTypeSlice";

// vysvětlení kódu: https://www.youtube.com/watch?v=MV9NC3FoCmM&ab_channel=SimpleTut

const ItemTypesWrapper = ({ name, options, ...otherProps }) => {
  const { setFieldValue } = useFormikContext();
  const [field, meta] = useField(name);

  const handleChange = (evt) => {
    const { value } = evt.target;
    // console.log("evt", evt);
    console.log("value", value);
    console.log("name", name);
    console.log("options", options);
    setFieldValue(name, value);
  };

  const [itemType, setItemType] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    Axios.get("/api/item_types/")
      .then((res) => {
        console.log("MaterialTypes: ", res.data);
        setItemType(res.data);
        dispatch(getMaterialType());
      })
      .catch((err) => console.log(err));
  }, []);

  // const productOptions = itemType.map((opt, index) => (
  //   <option key={index} value={opt.id}>
  //     {opt.name}
  //   </option>
  // ));

  const configSelect = {
    ...field,
    ...otherProps,
    select: true,
    variant: "outlined",
    fullWidth: true,
    onChange: handleChange,
  };

  if (meta && meta.touched && meta.error) {
    configSelect.error = true;
    configSelect.helperText = meta.error;
  }

  return (
    <TextField {...configSelect}>
      {itemType.map((opt, index) => {
        return (
          <MenuItem key={index} value={opt.id}>
            {opt.name}
          </MenuItem>
        );
      })}
    </TextField>
  );
};

export default ItemTypesWrapper;
