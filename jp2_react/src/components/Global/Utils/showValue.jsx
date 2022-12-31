  import { Typography } from "@mui/material";
  
  // fce "showUnit" načte "data" příslušného "item", který uživatel zvolil selectem "ItemWrapper"
  // pak přiřadí "data", tedy "id" z načteného API seznamu Items příslučnému "item"
  // nakonec u nalezeného item zobrazí atribut "unit", tedy jednotku přiřazenou danému item
  export function ShowValue(props) {
    // console.log("props:",props);
    // console.log("props.value:", props.value);
    // console.log("props.data:", props.data);
    let value = props.value;
    const object = props.object;
    const data = props.data;
    var filtered = Object.fromEntries(
      Object.entries(object).filter(([k, v]) => v.id === data)
    );
    // console.log(
    //   "filtered",(filtered)
    // );
    if (value === "price") {
    var filteredUnit = Object.keys(filtered).map((key,e) => (
        (filtered[key].price)
    ))}

       if (value === "quantity_of_material") {
    var filteredUnit = Object.keys(filtered).map((key,e) => (
        (filtered[key].quantity_of_material)
    ))}

    else if (value === "unit") {
    var filteredUnit = Object.keys(filtered).map((key,e) => (
        (filtered[key].unit)  
    ))}

    else if (value === "stocked") {
    var filteredUnit = Object.keys(filtered).map((key,e) => (
        (filtered[key].stocked)  
    ))};

    //var final = filteredUnit[0].props.children[0]


    // console.log("filteredUnit_new", filteredUnit);
    // console.log("filteredUnit_number", filteredUnit[0].props.children[0]);

    return filteredUnit
    //return final;
  }