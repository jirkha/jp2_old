import React, { useState, useEffect } from "react";
import Axios from "axios";
import DayStatistic from "../components/Statistic/DayStatistic";
import MonthStatistic from "../components/Statistic/MonthStatistic";
import YearPicker from "../components/Global/DateTimePicker/YearPicker";

import { Container, Typography, Stack, Box } from "@mui/material";
import StatisticUnit from "../components/Statistic/StatisticUnit";
import DateRangePicker from "../components/Global/DateTimePicker/DateRangePicker"
import { TableGlobalStatistic } from "../components/Global/Tables/TableGlobalStatistic";
import { DAY_STATISTIC_COLUMNS } from "../components/Statistic/DayStatisticColumns";
import { MONTH_STATISTIC_COLUMNS } from "../components/Statistic/MonthStatisticColumns";

function SalesStatisticPage() {
  let [data, setData] = useState([]);
  let [dataMonth, setDataMonth] = useState([]);
  let [dataYear, setDataYear] = useState([]);

  useEffect(() => {
    getData();
    getDataMonth();
    getDataYear();
  }, []);

  let getData = async () => {
    Axios.get("/api/daily_sales/").then((res) => {
      console.log("dny",res.data)
      setData(res.data);
      //console.log("data: ", res.data);
    });
  };

  let getDataMonth = async () => {
    Axios.get("/api/monthly_sales/").then((res) => {
      // console.log(res.data[1].months);
      //console.log(res.data);
      //setDataMonth(res.data);
      setDataMonth(res.data[0].months);
      //console.log("data: ", res.data);
    });
  };

  let getDataYear = async () => {
    Axios.get("/api/yearly_sales/").then((res) => {
      console.log("roky",res.data);
      setDataYear(res.data);
      //console.log("data: ", res.data);
    });
  };

  const onSubmit = (values) => {
    //console.log("CurrentPrice")
    const { day_from, day_to } = values;
    Axios.post("/api/daily_sales/", {
      day_from,
      day_to,
    })
      .then((res) => {
        console.log("Filtering: ", res.data);
        setData(res.data);
        //dispatch(getSale()); //aktualizuje seznam prodejních kanálů
      })
      .catch((err) => console.log(err));
  };

  const resetTable = () => {
    getData();
  };

  return (
    <div>
      <Container component="section" id="storageForm">
        <Typography
          variant="h2"
          sx={{ mt: 3 }} //mezera nad textem
          color="primary"
          align="center" //zarovná doprostřed
          gutterBottom //vytvoří mezeru pod textem
        >
          &#9782; Statistika tržeb
        </Typography>
        <StatisticUnit
          title="Denní tržby"
          filter={
            <DateRangePicker onSubmit={onSubmit} resetTable={resetTable} />
          }
          table={
            <TableGlobalStatistic
              columns={DAY_STATISTIC_COLUMNS}
              dataAPI={data}
            />
          }
          chart={<DayStatistic data={data} />}
        />
        <StatisticUnit
          title="Měsíční tržby"
          filter={<YearPicker dataYear={dataYear} setDataMonth={setDataMonth} />}
          table={
            <>
              <TableGlobalStatistic
                columns={MONTH_STATISTIC_COLUMNS}
                dataAPI={dataMonth}
              />
            </>
          }
          chart={<MonthStatistic data={dataMonth} />}
        />
      </Container>
    </div>
  );
}

export default SalesStatisticPage;
