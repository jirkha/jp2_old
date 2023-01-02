import React from "react";
import { TextField, MenuItem } from "@mui/material";
import { useField, useFormikContext } from "formik";

const SelectArrayWrapper = ({ name, options, ...otherProps }) => {
  const { setFieldValue } = useFormikContext();
  const [field, meta] = useField(name);
  const { handleOnChange } = otherProps ; //navázáno na komponentu YearPicker (výběr roku ihned po zvolení bez nutnosti potvrzení)

  const handleChange = (evt) => {
    const { value } = evt.target;
    // console.log("name: ", name);
    // console.log("value: ", value);
    // console.log("...otherProps: ", otherProps['handleOnChange']);
    setFieldValue(name, value);
    {otherProps["handleOnChange"] && handleOnChange(value)} //ověří, zda je SelectArrayWrapper vyvolán komponentou YearPicker
  };

  const configSelect = {
    ...field,
    ...otherProps,
    select: true,
    variant: "outlined",
    fullWidth: true,
    onChange: handleChange,
    
    // SelectProps:{
    //   multiple: true
    //   //value: formState.userRoles,
    //   //onChange: handleFieldChange
    // }
  };

  if (meta && meta.touched && meta.error) {
    configSelect.error = true;
    configSelect.helperText = meta.error;
  }

  return (
    <TextField
      {...configSelect}
    >
      {Object.keys(options).map((item, pos) => {
        // console.log("options", options);
        // console.log("item", item);
        // console.log("pos", pos);
        // console.log("options[item]['name']", options[item]["name"]);
        return (
          <MenuItem key={pos} value={options[item]["id"]}>
            {options[item]["name"]}
          </MenuItem>
        );
      })}
    </TextField>
  );
};

export default SelectArrayWrapper;
