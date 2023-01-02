import { TextField, Typography } from "@mui/material";
import React, { useState } from "react";
import PlacesAutocomplete, {
  //geocodeByAddress,
  geocodeByPlaceId,
  //getLatLng,
} from "react-places-autocomplete";
import { GoogleSearch } from "../Utils/utils";

function GooglePlaces({ listAdress, ...otherProps }) {
  const [adress, setAdress] = useState(null);
  const { setListAdress } = otherProps;
  // const handleSelect = async value => {
  //   //const result = await geocodeByAddress(value);
  //   //setAdress(result)
  //   console.log("handleSelect", {value});
  //   setAdress(value)};

  

  const handleSelect = (address, placeId) => {
    /// přesunout do AddSaleForm
    //console.log("address", address);
    //console.log("placeId", placeId);
    setAdress(address);

    const search = GoogleSearch(placeId);
    //const results = await geocodeByAddress(address);
    //const latLng = await getLatLng(results[0]);
    //const [place] = await geocodeByPlaceId(placeId);
    //let list = [];
    search.then((search) => {
      //console.log("search.postalCode", search["postalCode"]);
      console.log("search", search);

      setListAdress(search);
      });
    //console.log("search_without",search);

    // const { long_name: postalCode = "" } =
    //   place.address_components.find((c) => c.types.includes("postal_code")) ||
    //   {};
    //setListAdress({ postal_code: search });

    // adressAttributes.map((attribute) => {
    //   const { long_name: attribute = "" } =
    //     place.address_components.find((c) => c.types.includes(attribute)) || {};
    // })

    // let postC = postalCode;
    // console.log("postC", postC);
    // console.log("postalCode", postalCode);
    // listAdress.push({ postal_code: postC });
    // console.log("listAdress", listAdress);
  };

  const handleChange = (value) => {
    console.log("handleChange", value);

    setAdress(value);
  };

  return (
    <div>
      <PlacesAutocomplete
        value={adress}
        onChange={handleChange}
        onSelect={handleSelect}
      >
        {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
          <div>
            <TextField
              fullWidth
              size="small"
              color="success"
              {...getInputProps({
                placeholder: "Zkuste vyhledat firmu ...",
                className: "location-search-input",
              })}
            />
            <div className="autocomplete-dropdown-container">
              {loading && <div>Loading...</div>}
              {suggestions.map((suggestion) => {
                const className = suggestion.active
                  ? "suggestion-item--active"
                  : "suggestion-item";
                // inline style for demonstration purpose
                const style = suggestion.active
                  ? { backgroundColor: "#fafafa", cursor: "pointer" }
                  : { backgroundColor: "#ffffff", cursor: "pointer" };
                return (
                  <div
                    {...getSuggestionItemProps(suggestion, {
                      className,
                      style,
                    })}
                  >
                    <Typography variant="caption">
                      {suggestion.description}
                    </Typography>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </PlacesAutocomplete>
    </div>
  );
}

export default GooglePlaces;
