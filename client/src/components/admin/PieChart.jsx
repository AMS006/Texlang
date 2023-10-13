import React, { useMemo } from "react";
import { Chart } from "react-google-charts";
import { useSelector } from "react-redux";



export const options = {
  title: "JOB WISE COST PIE CHART",
};

const PieChart = () => {
    const {pieChartData} = useSelector((state) => state.work)
    const data = useMemo(() => pieChartData,[pieChartData])
  return (
    <>
      {data && data?.length > 0 &&<Chart
        chartType="PieChart"
        data={data}
        options={options}
        width={"100%"}
        height={"400px"}
      />}
    </>
  );
}

export default PieChart