import { getDailyCovid } from 'api/currency';
import { useEffect, useState } from 'react';
import Chart from 'react-apexcharts';
import { DailyDateType } from 'types';

type AreaProps = {
  country: string;
};

const AreaChart = ({ country }: AreaProps) => {
  const [dailyData, setDailyData] = useState<DailyDateType[]>();
  useEffect(() => {
    const getDailyData = async () => {
      const datas = await getDailyCovid(country);
      setDailyData(datas);
    };
    getDailyData();
  }, [country]);
  console.log(dailyData);
  return (
    <div>
      <Chart
        width="500"
        options={{
          chart: {
            type: 'area',
          },

          dataLabels: {
            enabled: false,
          },
          stroke: {
            curve: 'smooth',
          },
          yaxis: {
            title: {
              text: 'Covid 19 ',
            },
          },
          xaxis: {
            type: 'datetime',
            categories: dailyData?.map((item) => item.Date),
          },
          tooltip: {
            x: {
              format: 'dd/MM/yy',
            },
          },
        }}
        series={[
          { name: 'Vaka', data: dailyData?.map((item) => item.Confirmed) },
          { name: 'İyileşen', data: dailyData?.map((item) => item.Recovered) },
          { name: 'Ölüm', data: dailyData?.map((item) => item.Deaths) },
        ]}
      />
    </div>
  );
};

export default AreaChart;
