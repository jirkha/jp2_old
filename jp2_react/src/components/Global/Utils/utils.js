import { Typography } from "@mui/material";
import React, { useState, useEffect } from "react";
import Axios from "axios";
import { geocodeByPlaceId } from "react-places-autocomplete";


export function CurrentPrice(price, mark, change, variant ) {

  // console.log("mark", mark);
  // console.log("change", change);
  // console.log("variant", variant);

  if (variant === "%") {
        let changed = parseInt(change) * 0.01 * parseInt(price);
        if (mark === "+") {
          let result = parseInt(price) + parseInt(changed)
         return (
           <>
             <Typography>Prodejní cena za 1 produkt:</Typography>
             <Typography>
               {price} + {changed} = <strong>{result} Kč</strong> (navýšení{" "}
               {change}%)
             </Typography>
           </>
         );
      } else if (mark === "-") {
        let result = parseInt(price) - parseInt(changed)
         return (
           <>
             <Typography>Prodejní cena za 1 produkt:</Typography>
             <Typography>
               {price} - {changed} = <strong>{result} Kč</strong> (sleva{" "}
               {change}%)
             </Typography>
           </>
         );
      }
      } else {
        if (mark === "+") {
          let result = parseInt(price) + parseInt(change);
          return (
            <>
              <Typography>Prodejní cena za 1 produkt:</Typography>
              <Typography>
                {price} + {change} = <strong>{result} Kč</strong>
              </Typography>
            </>
          );
      } else if (mark === "-") {
        let result = parseInt(price) - parseInt(change);
         return (
           <>
             <Typography>Prodejní cena za 1 produkt:</Typography>
             <Typography>
               {price} - {change} = <strong>{result} Kč</strong>
             </Typography>
           </>
         );
      }
    }
  }

  // const adressAttributes = [
  //   "route", // název ulice nebo v případě menší obce bez názvů ulic čílo popisné
  //   "street_number", // číslo popisné
  //   "postal_code", // PSČ
  //   "locality", // název obce
  //   "sublocality_level_1", // část města (Praha xy)
  //   "country", // stát
  // ];
  function Search (place, attribute) { return(place.address_components.find((c) => c.types.includes(attribute))) || {}};
  
export const GoogleSearch = async ( placeId ) => {
  const [place] = await geocodeByPlaceId(placeId);
  let list = {};
  //console.log("place", place);
  const { long_name: postalCode = "" } = Search(place, "postal_code");
  //console.log("postalCode", postalCode);
  list["postalCode"] = postalCode;
  //postalCode && list.push({ postal_code: postalCode });

  const { long_name: street_number = "" } = Search(place, "street_number");
  //console.log("street_number", street_number);
  list["street_number"] = street_number;
  //street_number && list.push({ street_number: street_number });

  const { long_name: country = "" } = Search(place, "country");
  list["country"] = country;
  
  const { long_name: route = "" } = Search(place, "route");
  list["route"] = route;
  
  const { long_name: locality = undefined } = Search(place, "locality");
  list["locality"] = locality;

  const { long_name: sublocality_level_1 = undefined } = Search(
    place,
    "sublocality_level_1"
  );
  list["sublocality_level_1"] = sublocality_level_1;

  console.log("list", list);
  
  return list;
}