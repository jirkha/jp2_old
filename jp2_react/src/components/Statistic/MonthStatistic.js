import React, { useState, useEffect } from "react";
import Axios from "axios";
import {
  Area,
  AreaChart,
    CartesianGrid,
    Legend,
    Tooltip,
    XAxis,
    YAxis,
} from "recharts";
import { Box } from "@mui/material";

function MonthStatistic(props) {
    // let [data, setData] = useState([]);

    // useEffect(() => {
    //   console.log("props.data", props.data);
    // }, [props.data]);

    // let getData = async () => {
    // Axios.get('/api/daily_sales/')
    //    .then((res) => {
    //     setData(res.data)
    //     //console.log("data: ", res.data);
    // })};

 
return (
  <Box>
    <AreaChart width={700} height={500} data={props.data}>
      {/* <Line type="monotone" dataKey="sales" stroke="#2196F3" strokeWidth={3} /> */}
      <CartesianGrid strokeDasharray="3 3" />
      {/* <CartesianGrid stroke="#ccc" /> */}
      <XAxis dataKey="month" />
      <YAxis tickFormatter={(t) => `${t} Kč`} />
      <Tooltip />
      <Legend />
      <Area
        type="monotone"
        dataKey="tržby"
        name="Tržby [Kč]"
        stroke="#2196F3"
        fill="#2196F3"
        strokeWidth={3}
      />
    </AreaChart>
  </Box>
);
}

export default MonthStatistic;