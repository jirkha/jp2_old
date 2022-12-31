import React from "react";

import {
  Typography,
  Button,
  Stack,
} from "@mui/material";
import DateTimePicker from "./DateTimePicker";
import { Formik, Form } from "formik";

import "react-date-range/dist/styles.css"; // main css file
import "react-date-range/dist/theme/default.css"; // theme css file

export default function DateRangePicker(props) {
  const { resetTable, onSubmit } = props;
  const currDate = new Date().toLocaleDateString("fr-CA"); //uloží aktuální datum ve formátu "fr-CA"

  const initialValues = {
    day_from: "",
    day_to: currDate,
  };

  return (
    <Formik
      //innerRef={ref}
      initialValues={initialValues}
      //validationSchema={validationSchema}
      enableReinitialize={true}
      onSubmit={async (values, { resetForm }) => {
        await onSubmit(values);
        //resetForm();
      }}
    >
      {({ isValid, values }) => (
        <Form>
          {/* <Box sx={{ flexWrap: "wrap" }}> */}
          <Stack>
            <Typography
              variant="subtitle2"
              //color="textPrimary"
              //align="center" //zarovná doprostřed
              gutterBottom //vytvoří mezeru pod textem
            >
              Filtrování transakcí
            </Typography>
          </Stack>
          <Stack
            spacing={2}
            direction="row"
            justifyContent="space-between"
            alignItems="flex-end"
            //maxWidth="630px"
          >
            <DateTimePicker
              name="day_from"
              label="Počáteční datum"
              variant="outlined"
              //required
            />
            <DateTimePicker
              name="day_to"
              label="Koncové datum"
              variant="outlined"
              //required
            />
            <Button
              type="submit"
              className="button"
              variant="outlined"
              sx={{ height: 56, width: 350 }}
              //onClick={() => isValid && closeOpenPopup()}
            >
              Filtruj
            </Button>
            <Button
              //type="submit"
              className="button"
              variant="outlined"
              color="success"
              sx={{ height: 56, width: 350 }}
              onClick={() => resetTable()}
            >
              Zobraz vše
            </Button>
          </Stack>
          {/* </Box> */}
        </Form>
      )}
    </Formik>
  );
}








//   const [state, setState] = useState([
//     {
//       startDate: new Date(),
//       endDate: addDays(new Date(), 7),
//       key: "selection",
//     },
//   ]);

//   useEffect(() => {
//     console.log(state);
//   }, [state]);

//   return (
//     <div>
//       <Accordion sx={{ flexWrap: "wrap" }} wrap="nowrap">
//         <AccordionSummary
//           wrap="nowrap"
//           sx={{ flexWrap: "wrap" }}
//           expandIcon={<ExpandMoreIcon />}
//           aria-controls="panel1a-content"
//           id="panel1a-header"
//         >
//           <CalendarMonthIcon sx={{ mr: 2 }} />
//           <Typography>Filtrování podle kalendáře</Typography>
//         </AccordionSummary>
//         <AccordionDetails sx={{ flexWrap: "wrap" }}>
//           <DateRange
//             locale={locales.cs}
//             editableDateInputs={true}
//             onChange={(item) => setState([item.selection])}
//             moveRangeOnFirstSelection={false}
//             ranges={state}
//           />
//         </AccordionDetails>
//       </Accordion>
//     </div>
//   );
// }
