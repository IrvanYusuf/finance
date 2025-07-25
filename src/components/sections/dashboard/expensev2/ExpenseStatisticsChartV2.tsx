import { SxProps, useTheme } from '@mui/material';
import ReactEchart from 'components/base/ReactEchart';
import { ExpenseDataType } from 'data/expense-chart';
import { PieSeriesOption } from 'echarts';
import EChartsReactCore from 'echarts-for-react/lib/core';
import { PieChart } from 'echarts/charts';
import {
  GridComponent,
  GridComponentOption,
  LegendComponent,
  ToolboxComponent,
  TooltipComponentOption,
} from 'echarts/components';
import * as echarts from 'echarts/core';
import 'echarts/lib/component/tooltip';
import { CanvasRenderer } from 'echarts/renderers';
import { useMemo } from 'react';

// Use ComposeOption to compose an Option type that only has required components and charts
export type ECOption = echarts.ComposeOption<
  PieSeriesOption | TooltipComponentOption | GridComponentOption
>;
echarts.use([PieChart, LegendComponent, CanvasRenderer, GridComponent, ToolboxComponent]);

interface ExpenseStatisticsChartProps {
  chartRef: React.MutableRefObject<EChartsReactCore | null>;
  sx?: SxProps;
  seriesData: ExpenseDataType;
}
const ExpenseStatisticsChartV2 = ({ chartRef, ...rest }: ExpenseStatisticsChartProps) => {
  const { seriesData } = rest;
  const theme = useTheme();
  const { palette } = theme;

  const chartOptions: ECOption = useMemo(() => {
    return {
      backgroundColor: palette.common.white,

      tooltip: {
        trigger: 'item',
      },
      // color: [
      //   palette.primary.darker,
      //   palette.primary.main,
      //   palette.secondary.main,
      //   palette.warning.main,
      // ],
      toolbox: {
        show: true,
        feature: {
          mark: { show: true },
          dataView: { show: true, readOnly: false },
          restore: { show: true },
          saveAsImage: { show: true },
        },
      },
      series: [
        {
          name: 'Expense',
          type: 'pie',
          selectedMode: 'series',
          selectedOffset: 5,
          radius: '85%',
          center: ['45%', '45%'],
          roseType: 'radius',
          avoidLabelOverlap: false,
          // minAngle: 1,
          data: seriesData,
          label: {
            show: true,
            // position: 'inside',
            formatter: (params) => {
              return `${params.percent}%\n${params.name}`;
            },
          },
          //   rich: {
          //     percent: {
          //       fontSize: 16,
          //       fontWeight: 'bold',
          //       color: palette.common.white,
          //     },
          //     name: {
          //       fontSize: 13,
          //       fontWeight: 'bold',
          //       color: palette.common.white,
          //     },
          //   },
          //   color: palette.common.white,
          //   fontSize: 13,
          //   fontWeight: 'bold',
          //   padding: [0, 0, 0],
          // },
          // emphasis: {
          //   itemStyle: {
          //     borderColor: palette.common.white,
          //   },
          // },

          animationType: 'expansion',
          animationEasing: 'backOut',
          animationDuration: 1000,
        },
      ],
    };
  }, [theme, seriesData]);

  return (
    <ReactEchart
      echarts={echarts}
      option={chartOptions}
      ref={chartRef}
      sx={{
        width: 1,
        height: 1,
        maxHeight: 270,
        minWidth: 1,
      }}
      {...rest}
    />
  );
};

export default ExpenseStatisticsChartV2;
