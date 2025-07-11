import CardContainer from 'components/common/CardContainter';
import ExpenseStatisticsChart from 'components/sections/dashboard/expense/ExpenseStatisticsChart';
import { expenseData, ExpenseDataType } from 'data/expense-chart';
import ReactECharts from 'echarts-for-react';
import axiosInstance from 'helpers/axios';
import { useChartResize } from 'providers/useEchartResize';
import { useEffect, useRef, useState } from 'react';
import { endpoints } from 'routes/endpoints';
import ExpenseStatisticsChartV2 from './ExpenseStatisticsChartV2';

const ExpenseStatisticsV2 = () => {
  const chartRef = useRef<ReactECharts>(null);
  const [chartData, setChartData] = useState<ExpenseDataType>([]);
  useChartResize(chartRef);
  // Fetch sales data
  const fetchData = async () => {
    try {
      const response = await axiosInstance.get(endpoints.transactions.expenseStatictic);
      const data = response.data;

      setChartData(data.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);
  return (
    <CardContainer title="Expense Statistics">
      <ExpenseStatisticsChartV2 chartRef={chartRef} seriesData={chartData} />
    </CardContainer>
  );
};

export default ExpenseStatisticsV2;
