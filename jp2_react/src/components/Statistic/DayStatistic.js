import React, { useState, useEffect } from "react";
import Axios from "axios";
import {
  Area,
  AreaChart,
    CartesianGrid,
    Label,
    Legend,
    Tooltip,
    XAxis,
    YAxis,
} from "recharts";
import { Box } from "@mui/material";

function DayStatistic(props) {
    // let [data, setData] = useState([]);

    // useEffect(() => {
    //   getData();
    //     }, []);

    // let getData = async () => {
    // Axios.get('/api/daily_sales/')
    //    .then((res) => {
    //     setData(res.data)
    //     //console.log("data: ", res.data);
    // })};

 
return (
  <Box>
    <AreaChart width={700} height={500} data={props.data}>
      <Area
        type="monotone"
        dataKey="tržby"
        stroke="#2196F3"
        fill="#2196F3"
        strokeWidth={3}
      />
      <CartesianGrid stroke="#ccc" />
      <XAxis dataKey="day"></XAxis>
      <YAxis />
      <Tooltip />
      <Legend />
    </AreaChart>
  </Box>
);
}

export default DayStatistic