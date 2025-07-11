import CardContainer from 'components/common/CardContainter';
import WeeklyActivityChart from 'components/sections/dashboard/activity/WeeklyActivityChart';
import { TransactionDataType } from 'data/activity-chart';
import ReactECharts from 'echarts-for-react';
import axiosInstance from 'helpers/axios';
import { useChartResize } from 'providers/useEchartResize';
import { useEffect, useRef, useState } from 'react';
import { endpoints } from 'routes/endpoints';

const WeeklyActivity = () => {
  const chartRef = useRef<ReactECharts>(null);
  const [chartData, setChartData] = useState<TransactionDataType>([]);
  useChartResize(chartRef);

  // Fetch weekly data
  const getWeeklyDatas = async () => {
    try {
      const response = await axiosInstance.get(endpoints.transactions.weeklyActivity);

      const data = response.data;
      setChartData(data.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getWeeklyDatas();
  }, []);

  return (
    <CardContainer title="Weekly Activity">
      <WeeklyActivityChart chartRef={chartRef} seriesData={chartData} />
    </CardContainer>
  );
};

export default WeeklyActivity;
